// Import React
import React, { use, useEffect } from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Import screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen.js";
import AddWatchScreen from "./screens/AddWatchScreen.js";
import WatchListScreen from "./screens/WatchListScreen.js";
// Import notifications
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// TODO: Remove unneeded expo token code
export default function App() {
  useEffect(() => {
    async function register() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted!");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo push token:", token);

      // TODO: send token to backend along with userEmail
    }
    register();
  }, []);

  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Watch" component={AddWatchScreen} />
        <Stack.Screen name="WatchList" component={WatchListScreen} />
      </Stack.Navigator>
  );
}
