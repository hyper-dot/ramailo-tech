import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, Button } from "react-native";
import { homeStyles } from "./styles/home";

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
        product.price.toString().includes(query),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={homeStyles.container}>
      <Button
        title="Go to Dummy"
        onPress={() => navigation.navigate("Dummy")}
      />
      <TextInput
        style={homeStyles.searchInput}
        placeholder="Search products"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={homeStyles.productContainer}>
            {item.images.length > 0 && (
              <Image
                source={{ uri: item.images[0] }}
                style={homeStyles.productImage}
              />
            )}
            <View style={homeStyles.productDetails}>
              <Text style={homeStyles.productTitle}>{item.title}</Text>
              <Text style={homeStyles.productPrice}>Price: ${item.price}</Text>
              <Text style={homeStyles.productDesc}>{item.description}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default HomeScreen;
