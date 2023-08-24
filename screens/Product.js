import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";

import Error from "./Error"; 
import { styles } from "./styles/product"; 

// Product component definition
const Product = ({ route }) => {
  const { itemId } = route.params;
  const [product, setProduct] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // index of image to display in carousel
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${itemId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        // Returning Error component here might not be necessary, just an assumption based on your code
        return Error;
      }
    };
    fetchProduct();
  }, [itemId]);

  // Handle image carousel
  const handleCarousel = (direction) => {
    const newIndex =
      (currentIndex + direction + product.images.length) %
      product.images.length;
    setCurrentIndex(newIndex);
  };

  // Loading Screen
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Product image */}
      {product.images && product.images.length > 0 && (
        <Image
          source={{ uri: product.images[currentIndex] }}
          style={styles.image}
        />
      )}

      {/* Carousel buttons */}
      <View style={styles.carouselButtons}>
        <TouchableOpacity
          onPress={() => handleCarousel(-1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCarousel(1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Product information */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.productRating}>
          <Text style={styles.label}>Rating</Text> : {product.rating}
        </Text>
        <Text style={styles.productRating}>
          <Text style={styles.label}>In Stock</Text> : {product.stock}
        </Text>
        <Text style={styles.productDesc}>{product.description}</Text>
      </View>
    </View>
  );
};

export default Product;
