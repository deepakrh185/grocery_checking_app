import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

const Footer = ({ setShow, setLogOut }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <TouchableOpacity>
        <Image
          style={styles.icon}
          source={{
            uri: "https://img.icons8.com/ios/50/ed-left.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Image
          style={styles.icon}
          source={{
            uri: "https://img.icons8.com/ios/50/000000/add--v1.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setLogOut(true)}>
        <Image
          style={styles.icon}
          source={{
            uri: "https://img.icons8.com/ios/50/000000/logout-rounded-left.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
  icon2: {
    width: 50,
    height: 20,
    resizeMode: "contain",
  },
});

export default Footer;
