import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import * as Validator from "email-validator";
import { firebase, db } from "../../firebase";

const LoginForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 6 characters"),
  });

  const onLogin = async (email, password, username) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password, username);
      console.log("firebase logged in", email, password, username);
      setLoading(false);
    } catch (error) {
      Alert.alert(
        " 🔥 Oops..",
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
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <View style={styles.wrapper}>
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
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
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
            {/* <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
                <Text style={{ color: "#6BB0F5" }}>Forget Password</Text>
              </View> */}
            <View style={{ marginTop: 10 }}>
              {loading ? (
                <ActivityIndicator size={50} color="#886aae" />
              ) : (
                <Pressable
                  titleSize={20}
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
              )}
            </View>
            {/* <Button title="Login" /> */}
            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
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
    margin: 20,
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

export default LoginForm;
