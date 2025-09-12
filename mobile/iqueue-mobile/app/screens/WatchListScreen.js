import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";

const BACKEND_URL = Constants.expoConfig.extra.BACKEND_URL;

export default function WatchListScreen() {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notifiedIds, setNotifiedIds] = useState(new Set());

    
    const fetchWatches = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");
            const response = await fetch(`${BACKEND_URL}/api/watches`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();

            data.forEach(async (watch) => {
                if (watch.status === "ready" && !notifiedIds.has(watch.id)) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: "Ready!",
                            body: `You're near the front of the queue for ${watch.eventUrl}`,
                            data: { watchId: watch.id },
                        },
                        trigger: null,
                    });

                    setNotifiedIds((prev) => new Set(prev).add(watch.id));
                }
            });

            setWatches(data);
        } catch (err) {
            console.error("Error fetching watches:", err)
            setError("Failed to load watches");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWatches();
        const interval = setInterval(fetchWatches, 10000);
        return () => clearInterval(interval);
    });

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading watches...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (watches.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No active watches found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={watches}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.url}>{item.eventUrl}</Text>
                        <Text>
                            {item.thresholdType}: {item.thresholdValue}
                        </Text>
                        <Text>User: {item.userEmail}</Text>
                        <Text>Status: {item.status}</Text>

                        <Button 
                            title="Delete"
                            onPress={async () => {
                                await fetch(`${BACKEND_URL}/api/watches/${item.id}`, { method: "DELETE"});
                                fetchWatches();
                            }}
                        />
                    </View>    
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        backgroundColor: "#f9f9f9",
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
        elevation: 2,
    },
    url: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    error: {
        color: "red",
    },
});