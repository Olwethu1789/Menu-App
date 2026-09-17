import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />

      {showSplash && (
        <View style={styles.splash}>
          <Text style={styles.chefIcon}>👨‍🍳</Text>

          <Text style={styles.title}>
            CHEF'S MENU MANAGER
          </Text>

          <Text style={styles.subtitle}>
            Manage your menu with ease
          </Text>

          <Text style={styles.loading}>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  splash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    zIndex: 100,
  },

  chefIcon: {
    fontSize: 70,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#555555',
  },

  loading: {
    position: 'absolute',
    bottom: 45,
    fontSize: 14,
    color: '#777777',
  },
});