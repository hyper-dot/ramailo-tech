import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, Button } from "react-native";
import { styles } from "./styles/home";

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products and set products in the filteredProducts
  const handleSearch = (query) => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.price.toString().includes(query),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
      />
      <FlatList
        data={filteredProducts.length > 0 ? filteredProducts : products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {item.images.length > 0 && (
              <Image
                source={{ uri: item.images[0] }}
                style={styles.productImage}
              />
            )}
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>Price: ${item.price}</Text>
              <Text style={styles.productDesc}>{item.description}</Text>
              <Button
                title="See More"
                onPress={() =>
                  navigation.navigate("Product", { itemId: item.id.toString() })
                }
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default HomeScreen;
