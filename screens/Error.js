import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles/error";

const Error = () => {
  return (
    <View>
      <Text style={styles.errorTxt}>Error Fetching Data</Text>
    </View>
  );
};

export default Error;
