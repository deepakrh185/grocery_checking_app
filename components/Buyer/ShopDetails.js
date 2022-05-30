import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { firebase, db } from "../../firebase";
import BuyerHeader from "./BuyerHeader";
import { Picker } from "@react-native-picker/picker";

const ShopDetails = ({ route, navigation }) => {
  const { item_name, price, quantity, item, unit, shopName } = route.params;
  const [selectedValue, setSelectedValue] = useState(unit);
  const [loading, setLoading] = useState(false);

  const loginFormSchema = Yup.object().shape({
    item_name: Yup.string().required().min(2, "A itemname is required"),
    quantity: Yup.string().required(),
    price: Yup.string().required(),
    selectedValue: Yup.string().required(),
    shopName: Yup.string().required(),
  });
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const MAX_REVIEW = 100;
  const MIN_REVIEW = 20;
  const review = useState(
    Math.floor(Math.random() * (MAX_REVIEW - MIN_REVIEW + 1)) + MIN_REVIEW
  );
  return (
    <View style={styles.container}>
      <BuyerHeader navigation={navigation} route={route} />
      <Formik
        initialValues={{
          item_name: item_name,
          quantity: quantity,
          price: price,
          selectedValue: selectedValue,
          shopName: shopName,
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          setFieldValue,
        }) => (
          <View style={styles.wrapper}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                textAlign: "center",
              }}
            >
              {values.shopName.toUpperCase()}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                marginBottom: 10,
                marginTop: 70,
              }}
            >
              Item
            </Text>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: values.item_name.length > 1 ? "#ccc" : "red",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000000",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {values.item_name}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Quantity
            </Text>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                },
                {
                  borderColor: values.quantity.length > 0 ? "#ccc" : "red",
                },
              ]}
            >
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: "#FAFAFA",
                  borderWidth: 0.5,
                  width: "50%",
                  height: 50,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {values.quantity}
                </Text>
              </View>
              <View
                style={[
                  {
                    borderRadius: 4,
                    backgroundColor: "#FAFAFA",
                    borderWidth: 0.5,
                    width: "40%",
                    height: 50,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    height: "100%",
                    padding: 11,

                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {values.selectedValue}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Price
            </Text>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: values.price.length > 0 ? "#ccc" : "red",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000000",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {values.price}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Ratting
            </Text>
            <View style={{ flexDirection: "row" }}>
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <Text style={{ fontSize: 22, fontWeight: "700" }}>⭐ </Text>
                ))}
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              Reviews
            </Text>
            <View style={{ flexDirection: "row" }}>
              {Array(review)
                .fill()
                .map((_, i) => (
                  <Text style={{ fontSize: 22, fontWeight: "600" }}>
                    {review}
                  </Text>
                ))}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: "center",
  },
  wrapper: {
    marginTop: 40,
  },
  inputField: {
    borderRadius: 4,
    height: 50,
    padding: 10,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#390879" : "#886aae",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    width: "100%",
  },
});

export default ShopDetails;
