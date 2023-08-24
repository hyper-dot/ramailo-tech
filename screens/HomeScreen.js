import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, Button, ActivityIndicator } from "react-native";
import { styles } from "./styles/home"; // Assuming you have defined styles in a separate file
import Error from "./Error"; // Assuming you have an Error component defined

// HomeScreen component definition
function HomeScreen({ navigation }) {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
      // Returning Error component here might not be necessary, just an assumption based on your code
      return Error;
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query
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

  // Render the component
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
      />

      {/* Product list */}
      <FlatList
        data={filteredProducts.length > 0 ? filteredProducts : products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {/* Product image */}
            {item.images.length > 0 && (
              <Image
                source={{ uri: item.images[0] }}
                style={styles.productImage}
              />
            )}

            {/* Product details */}
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>Price : ${item.price}</Text>
              <Text style={styles.productCat}>Category : {item.category}</Text>
              {/* Button to navigate to product details */}
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
