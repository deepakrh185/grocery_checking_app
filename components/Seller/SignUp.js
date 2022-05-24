import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import * as Validator from "email-validator";
import { firebase, db } from "../../firebase";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    shopname: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 6 characters"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, shopname) => {
    setLoading(true);
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      db.collection("seller")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          shopname: shopname,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setLoading(false);
    } catch (error) {
      Alert.alert(
        " 🔥 My Lord..",
        error.message + "\n\n... What would you like to do next",
        [
          {
            text: "OK",
            onPress: () => console.log("Ok"),
            style: "cancel",
          },
          {
            text: "Sign Up",
            onPress: () => navigation.navigate("SignUpScreen", { user: "123" }),
          },
        ]
      );
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          shopname: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={(values) =>
          onSignup(
            values.email,
            values.password,
            values.shopname,
            values.passwordConfirmation
          )
        }
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <View style={styles.wrapper}>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: values.shopname.length > 2 ? "#ccc" : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="ShopName"
                autoCapitalize="none"
                textContentType="shopname"
                autoFocus={true}
                onChangeText={handleChange("shopname")}
                onBlur={handleBlur("shopname")}
                value={values.shopname}
                autoFocus={true}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.passwordConfirmation.length ||
                    values.passwordConfirmation.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Confirm Password"
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              {loading ? (
                <ActivityIndicator size={50} color="#886aae" />
              ) : (
                <Pressable
                  titleSize={20}
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
              )}
            </View>

            {/* <Button title="Login" /> */}
            <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    backgroundColor: "white",
  },
  inputField: {
    borderRadius: 4,
    padding: 8,
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
    marginTop: 20,
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

export default SignUp;
