import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  carouselButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  productInfo: {
    alignItems: "center",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  productDesc: {
    alignSelf: "flex-start",
    fontSize: 16,
    padding: 10,
  },
  productRating: {
    alignSelf: "flex-start",
    fontSize: 16,
    padding: 10,
  },
  productStock: {
    alignSelf: "flex-start",
    fontSize: 16,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
  },
  brand: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: "gray",
    borderRadius: 10,
    color: "blue",
    marginTop: 10,
  },
});
