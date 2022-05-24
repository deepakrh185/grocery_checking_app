import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { firebase, db } from "../../firebase";

const Header = ({ navigation, route }) => {
  const { item_name, price, quantity, item,shopname } = route.params;

  const deleteItem = () => {
    db.collection("seller")
      .doc(firebase.auth().currentUser.email)
      .collection("items")
      .doc(item)
      .delete({ item_name: item_name, quantity: quantity, price: price })
      .then(() => navigation.push("Product"));
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.push("Product")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#B3B4B6",
            justifyContent: "center",
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
        <TouchableOpacity
          onPress={() => deleteItem()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#B3B4B6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/material/50/000000/filled-trash.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
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

export default Header;
