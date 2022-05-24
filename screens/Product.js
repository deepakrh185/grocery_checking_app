import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import ProductList from "../components/Seller/ProductList";
import Footer from "../components/Seller/Footer";
import { firebase, db } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const Product = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [logOut, setLogOut] = useState(false);
  // const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shopName, setShopName] = useState();

  const initialValues = {
    item_name: "",
    quantity: "",
    price: "",
    unit: "",
  };
  const loginFormSchema = Yup.object().shape({
    item_name: Yup.string().required().min(2, "A itemname is required"),
    quantity: Yup.string().required(),
    price: Yup.string().required(),
    unit: Yup.string().required(),
  });

  useEffect(async () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("seller")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          setShopName(doc.data()?.shopname);
        })
      );
    return unsubscribe;
  }, []);

  const uploadPostToFirebase = (item_name, quantity, price, unit) => {
    setLoading(true);

    const unsubscribe = db
      .collection("seller")
      .doc(firebase.auth().currentUser.email)
      .collection("items")
      .add({
        item_name: item_name,
        // profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        quantity: quantity,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        price: price,
        unit: unit,
        shopname: shopName,
      });

    setLoading(true);
    return unsubscribe;
  };

  useEffect(async () => {
    setLoading(true);
    db.collection("seller")
      .doc(firebase.auth().currentUser.email)
      .collection("items")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({ id: post?.id, ...post?.data() }))
        );
        setLoading(false);
        setShow(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={50}
          color="#886aae"
          style={{ height: "100%" }}
        />
      ) : (
        <View style={styles.posts}>
          {posts.length > 0 ? (
            <Animatable.View animation="lightSpeedIn" iterationDelay={500}>
              <ScrollView>
                {posts?.map((data, i) => (
                  <ProductList item={data} key={i} navigation={navigation} />
                ))}
              </ScrollView>
            </Animatable.View>
          ) : (
            <View style={styles.text}>
              <Text>Items not found, click add button to add ! </Text>
            </View>
          )}
        </View>
      )}
      {/* Logout////////// */}
      <Modal animationType={"slide"} transparent={true} visible={logOut}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setLogOut(false)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            flex: 1,
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.logout}>
              <View>
                <Text style={{ color: "black" }}>Do you want to LogOut ?</Text>
              </View>
              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => setLogOut(false)}>
                  <Text
                    style={{
                      color: "black",
                      backgroundColor: "#AF9CC9",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                  <Text
                    style={{
                      color: "black",
                      backgroundColor: "#AF9CC9",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/* popup////////// */}
      <Modal animationType={"slide"} transparent={true} visible={show}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShow(false)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            flex: 1,
          }}
        >
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={require("../image/logo.png")}
                style={{ width: "85%", height: 80 }}
              />
              <TouchableOpacity onPress={() => setShow(false)}>
                <Image
                  style={{
                    width: 30,
                    height: 50,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: "https://img.icons8.com/ios/50/000000/cancel.png",
                  }}
                />
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={initialValues}
              onSubmit={(values) =>
                uploadPostToFirebase(
                  values.item_name,
                  values.quantity,
                  values.price,
                  values.unit
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
                setFieldValue,
                isValid,
              }) => (
                <View style={styles.wrapper}>
                  <View
                    style={[
                      styles.inputField,
                      {
                        borderColor:
                          values.item_name.length > 1 ? "#ccc" : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#444"
                      placeholder="ItemName"
                      autoCapitalize="none"
                      onChangeText={handleChange("item_name")}
                      onBlur={handleBlur("item_name")}
                      autoFocus={true}
                      value={values.item_name}
                      autoCorrect={true}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 4,
                          backgroundColor: "#FAFAFA",
                          borderWidth: 1,
                          width: "50%",
                          height: 50,
                          padding: 10,
                        },
                        {
                          borderColor:
                            values.quantity.length > 0 ? "#ccc" : "red",
                        },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="Quantity"
                        keyboardType="numeric"
                        onChangeText={handleChange("quantity")}
                        onBlur={handleBlur("quantity")}
                        value={values.quantity}
                      />
                    </View>
                    <View
                      style={[
                        {
                          borderWidth: 1,
                          backgroundColor: "#FAFAFA",
                          borderRadius: 4,
                          width: "45%",
                          height: 50,
                          paddingBottom: 20,
                        },
                        {
                          borderColor: values.unit ? "#ccc" : "red",
                        },
                      ]}
                    >
                      <Picker
                        selectedValue={values.unit}
                        onValueChange={(itemValue) => {
                          setFieldValue("unit", itemValue);
                        }}
                      >
                        <Picker.Item
                          label="Select"
                          value={initialValues.unit}
                        />
                        <Picker.Item label="kg" value="kg" />
                        <Picker.Item label="ltr" value="ltr" />
                        <Picker.Item label="grm" value="grm" />
                      </Picker>
                    </View>
                  </View>
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
                      placeholder="Price per (ltr) / (kg) / (g)"
                      autoCapitalize="none"
                      onChangeText={handleChange("price")}
                      onBlur={handleBlur("price")}
                      keyboardType="numeric"
                      value={values.price}
                    />
                  </View>
                  {loading ? (
                    <ActivityIndicator size={50} color="#886aae" />
                  ) : (
                    <Pressable
                      titleSize={20}
                      style={styles.button(isValid)}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </Formik>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Footer setShow={setShow} setLogOut={setLogOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  posts: {
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  modal: {
    backgroundColor: "#ffffff",
    height: 440,
    margin: 30,
    padding: 20,
    borderRadius: 20,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#390879" : "#886aae",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    marginTop: 20,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 16,
  },
  wrapper: {
    marginTop: 25,
  },
  inputField: {
    borderRadius: 4,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
    borderWidth: 1,
    height: 50,
    padding: 10,
  },
  logout: {
    backgroundColor: "#FAFAFA",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 150,
    marginHorizontal: 30,
  },
  box: {
    width: "100%",
    flex: 1,
  },
});

export default Product;
