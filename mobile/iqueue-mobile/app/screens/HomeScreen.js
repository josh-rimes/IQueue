import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to IQueue</Text>
      <Button
        style={styles.button}
        title="Go to Add Watch"
        onPress={() => navigation.navigate("Add Watch")}
      />
      <Button
        style={styles.button}
        title="Go to Watch List"
        onPress={() => navigation.navigate("WatchList")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  button: { padding: 1 },
});