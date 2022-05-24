import React from "react";
import { View, Image } from "react-native";
import SignUp from "../components/Seller/SignUp";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Image
        source={require("../image/logo.png")}
        style={{ width: "100%", height: 150 }}
      />
      <SignUp navigation={navigation} />
    </View>
  );
};

export default SignUpScreen;
