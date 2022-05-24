import { StyleSheet, SafeAreaView } from "react-native";
import GlobalStyles from "./GlobalStyles";
import AuthNavigation from "./AuthNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <AuthNavigation />
      </SafeAreaView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});
