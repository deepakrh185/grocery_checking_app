import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";

const SelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../image/logo.png")}
        style={{ width: "100%", height: 120 }}
      />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
          <Text style={styles.button_seller}>Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("BuyerScreen")}>
          <Text style={styles.button_buyer}>Buyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  app_name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -20,
  },
  button_seller: {
    padding: 10,
    backgroundColor: "#390879",
    margin: 20,
    textAlign: "center",
    borderRadius: 5,
    color: "white",
    width: 90,
  },
  button_buyer: {
    padding: 10,
    backgroundColor: "#b8df10",
    margin: 20,
    textAlign: "center",
    color: "black",
    borderRadius: 5,
    width: 90,
  },
});

export default SelectionScreen;
