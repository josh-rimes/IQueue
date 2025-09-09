import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen.js";
import AddWatchScreen from "./screens/AddWatchScreen.js";
import WatchListScreen from "./screens/WatchListScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Watch" component={AddWatchScreen} />
        <Stack.Screen name="WatchList" component={WatchListScreen} />
      </Stack.Navigator>
  );
}
