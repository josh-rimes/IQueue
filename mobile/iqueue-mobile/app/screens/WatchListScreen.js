import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Constants from "expo-constants";

const BACKEND_URL = Constants.expoConfig.extra.BACKEND_URL;

export default function WatchListScreen() {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/watches`);
                const data = await response.json();
                setWatches(data);
            } catch (err) {
                console.error("Error fetching watches:", err)
                setError("Failed to load watches");
            } finally {
                setLoading(false);
            }
        };

        fetchWatches();
    }, []);

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