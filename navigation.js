import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectionScreen from "./screens/SelectionScreen";
import LoginScreen from "./screens/LoginScreen";
import Product from "./screens/Product";
import SignUpScreen from "./screens/SignUpScreen";
import Details from "./components/Seller/Details";
import BuyerScreen from "./screens/BuyerScreen";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Product" screenOptions={screenOptions}>
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  </NavigationContainer>
);
export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SelectionScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
      <Stack.Screen name="BuyerScreen" component={BuyerScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
