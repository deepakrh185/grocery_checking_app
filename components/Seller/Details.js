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
import Header from "./Header";
import { Picker } from "@react-native-picker/picker";

const Details = ({ route, navigation }) => {
  const { item_name, price, quantity, item, unit } = route.params;
  const [selectedValue, setSelectedValue] = useState(unit);
  const [loading, setLoading] = useState(false);

  console.log("unit-->>", selectedValue);
  const loginFormSchema = Yup.object().shape({
    item_name: Yup.string().required().min(2, "A itemname is required"),
    quantity: Yup.string().required(),
    price: Yup.string().required(),
    selectedValue: Yup.string().required(),
  });

  const onLogin = async (item_name, quantity, price, selectedValue) => {
    setLoading(true);
    db.collection("seller")
      .doc(firebase.auth().currentUser.email)
      .collection("items")
      .doc(item)
      .update({
        item_name: item_name,
        quantity: quantity,
        price: price,
        unit: selectedValue,
      })
      .then(() => navigation.push("Product"));
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} route={route} />
      <Formik
        initialValues={{
          item_name: item_name,
          quantity: quantity,
          price: price,
          selectedValue: selectedValue,
        }}
        onSubmit={(values) =>
          onLogin(
            values.item_name,
            values.quantity,
            values.price,
            values.selectedValue
          )
        }
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
                marginBottom: 10,
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
              <TextInput
                placeholderTextColor="#444"
                placeholder="Item"
                autoCapitalize="none"
                onChangeText={handleChange("item_name")}
                onBlur={handleBlur("item_name")}
                value={values.item_name}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000",
                marginBottom: 10,
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
                <TextInput
                  placeholderTextColor="#444"
                  placeholder="Quantity"
                  autoCapitalize="none"
                  onChangeText={handleChange("quantity")}
                  onBlur={handleBlur("quantity")}
                  keyboardType="numeric"
                  value={values.quantity}
                />
              </View>
              <View
                style={[
                  {
                    borderWidth: 0.5,
                    backgroundColor: "#FAFAFA",
                    borderRadius: 4,
                    width: "37%",
                    height: 50,
                    paddingBottom: 20,
                  },
                ]}
              >
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => {
                    setFieldValue("selectedValue", itemValue);
                    setSelectedValue(itemValue);
                  }}
                >
                  <Picker.Item label="kg" value="kg" />
                  <Picker.Item label="ltr" value="ltr" />
                  <Picker.Item label="grm" value="grm" />
                </Picker>
              </View>
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#000000", 
                marginBottom: 10,
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
              <TextInput
                placeholderTextColor="#444"
                placeholder="Price per (piece) / per (kg)"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                keyboardType="numeric"
                value={values.price}
              />
            </View>

            <View style={{ marginTop: 30 }}>
              {loading ? (
                <ActivityIndicator size={50} color="#886aae" />
              ) : (
                <Pressable
                  titleSize={20}
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </Pressable>
              )}
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
    marginTop: 80,
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

export default Details;
