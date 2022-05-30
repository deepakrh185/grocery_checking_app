import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { firebase, db } from "../../firebase";

const BuyerHeader = ({ navigation, route }) => {
  const { item_name, price, quantity, item, shopname } = route.params;

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.push("BuyerScreen")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#B3B4B6",
            justifyContent: "center",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="angle-left"
            style={{
              fontSize: 16,
              color: "#000000",
            }}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={{
            color: "#000000",
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 12,
            textAlign: "center",

          }}
        >
          Time : 9:00 AM - 9:00 PM
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
    margin: 10,

    borderRadius: 10,
    borderWidth: 1,
  },
});

export default BuyerHeader;
