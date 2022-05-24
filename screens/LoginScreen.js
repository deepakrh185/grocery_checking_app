import React from "react";
import { View, Text, Image } from "react-native";
import LoginForm from "../components/Seller/LoginForm";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        source={require("../image/logo.png")}
        style={{ width: "100%", height: 200 }}
      />
      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;
