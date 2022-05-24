import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebase";
import BuyerHome from "../components/Buyer/BuyerHome";
import * as Animatable from "react-native-animatable";

const BuyerScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    db.collectionGroup("items").onSnapshot((snapshot) => {
      setItems(snapshot.docs.map((post) => ({ ...post.data() })));
      setLoading(false);
    });
  }, []);

  // useEffect(async () => {
  //   user.map((item) => item.shopname);
  //   "===",
  //     user.map((item) =>
  //       db.collection("item.shopname")?.onSnapshot((snapshot) => {
  //         setItems(snapshot.docs.map((post) => ({ ...post.data() })));
  //       })
  //     );
  // }, []);
  // console.log("items->>", items);

  // const totalShopName = user.map((item) => item.shopname);
  // useEffect(() => {
  //   totalShopName;
  // }, []);
  // console.log("totalShopName", totalShopName);

  // useEffect(async () => {
  //   const user = firebase.auth().currentUser;
  //   const unsubscribe = db
  //     .collection("seller")
  //     .where("owner_uid", "==", user.uid)
  //     .limit(1)
  //     .onSnapshot((snapshot) =>
  //       snapshot.docs.map((doc) => {
  //         console.log(doc.data());
  //         setShopName(doc.data()?.shopname);
  //       })
  //     );
  //   return unsubscribe;
  // }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>SHOPS</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size={50}
          color="#b8df10"
          style={{ height: "100%" }}
        />
      ) : (
        <View style={{ margin: 20 }}>
          <Animatable.View animation="fadeInDownBig">
            <ScrollView showsVerticalScrollIndicator={false}>
              {items?.map((item) => (
                <BuyerHome
                  key={item.id}
                  shopname={item.shopname}
                  item_name={item.item_name}
                  navigation={navigation}
                  item={item}
                  price={item.price}
                  qunatity={item.qunatity}
                  unit={item.unit}
                />
              ))}
            </ScrollView>
          </Animatable.View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  box: {
    width: "100%",
    flex: 1,
  },
});

export default BuyerScreen;
