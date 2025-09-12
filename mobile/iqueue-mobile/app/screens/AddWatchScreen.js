import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";

export default function AddWatchScreen({ navigation }) {
    const [eventUrl, setEventUrl] = useState("");
    const [thresholdType, setThresholdType] = useState("position");
    const [thresholdValue, setThresholdValue] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const handleSubmit = async () => {
        if (!eventUrl || !userEmail) {
            Alert.alert("Error", "Event URL and Email are required");
            return;
        }

        const BACKEND_URL = Constants.expoConfig.extra.BACKEND_URL;

        try {
            const response = await fetch(`${BACKEND_URL}/api/watches`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventUrl,
                    thresholdType,
                    thresholdValue: Number(thresholdValue),
                    userEmail,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", `Watch created with ID: ${data.id}`);

                setEventUrl("");
                setThresholdType("");
                setThresholdValue("");
                setUserEmail("");

                navigation.navigate("WatchList");
            } else {
                Alert.alert("Error", data.error || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not connect to backend");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Event URL:</Text>
            <TextInput
                style={styles.input}
                value={eventUrl}
                onChangeText={setEventUrl}
                placeholder="https://example.com/queue"
            />

            <Text style={styles.label}>Threshold Type:</Text>
            <TextInput
                style={styles.input}
                value={thresholdType}
                onChangeText={setThresholdType}
            />

            <Text style={styles.label}>Threshold Value:</Text>
            <TextInput
                style={styles.input}
                value={thresholdValue}
                onChangeText={setThresholdValue}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Your Email:</Text>
            <TextInput
                style={styles.input}
                value={userEmail}
                onChangeText={setUserEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
            />

            <Button title="Create Watch" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    label: {
        marginTop: 10, 
        fontWeight: "bold",
        color: "#000000ff" 
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        color: "#000000ff",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
});