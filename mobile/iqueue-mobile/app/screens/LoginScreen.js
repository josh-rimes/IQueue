import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const BACKEND_URL = Constants.expoConfig.extra.BACKEND_URL;

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                await SecureStore.setItemAsync("token", data.token);
                navigation.replace("Home");
            } else {
                Alert.alert("Error", data.error || "Login failed");
            }
        } catch (err) {
            Alert.alert("Error", "Could not connect to backend");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "centre", padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
});