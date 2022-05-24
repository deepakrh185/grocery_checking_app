import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

const BuyerHome = ({ item }) => {
  return (
    <Animatable.View
      iterationDelay={1000}
      iterationCount={2}
      animation="wobble"
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text>{item.shopname.toUpperCase()}</Text>
        </View>
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
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 10,
    paddingRight: 25,
    paddingLeft: 25,
    flex: 1,
    marginBottom: 30,
  },
  items: {
    color: "black",
    fontWeight: "500",
    fontSize: 24,
  },
  quantity: {
    fontWeight: "500",
    color: "black",
    fontSize: 16,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  price: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 15,
  },
});

export default BuyerHome;
