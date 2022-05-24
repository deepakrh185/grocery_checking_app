import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const ProductList = ({ item, navigation }) => {
  return (
    <Animatable.View iterationDelay={1000} animation="wobble">
      <TouchableOpacity
        onPress={() =>
          navigation.push("Details", {
            item_name: item.item_name,
            quantity: item.quantity,
            price: item.price,
            navigation: navigation,
            item: item.id,
            unit: item.unit,
          })
        }
      >
        <View style={styles.container} shadowOpacity={0.5}>
          <View style={styles.text}>
            <Text style={styles.items}>{item.item_name}</Text>
            <Text style={styles.quantity}>
              {item.quantity} {item.unit}
            </Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.price}>
              ₹{item.price} /
              {item.unit.includes("ltr") ? (
                <Text>ltr</Text>
              ) : item.unit.includes("kg") ? (
                <Text>kg</Text>
              ) : (
                <Text>grm</Text>
              )}
            </Text>
            <Text
              style={{
                opacity: 0,
              }}
            >
              fasdfas
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    color: "black",
  },
  items: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
  },
  price: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 15,
    color: "black",
  },
});

export default ProductList;
