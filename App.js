import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import Constants from 'expo-constants';

import WelcomeScreen from './screen/WelcomeScreen';
import LoginScreen from './screen/LoginScreen';
import SignUpScreen from './screen/SignUpScreen';
import HomeScreen from './screen/HomeScreen';
import TambahBarang from './screen/barang/TambahBarang';
import HapusBarang from './screen/barang/HapusBarang';
import EditBarang from './screen/barang/EditBarang';
import LihatBarang from './screen/barang/LihatBarang';

const Stack = createNativeStackNavigator();

const publishableKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your app.json');
}

export default function App() {
  const [barang, setBarang] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAdd = (name) => {
    const newItem = { id: Date.now().toString(), name };
    setBarang(prevBarang => [...prevBarang, newItem]);
  };

  const handleDelete = (id) => {
    setBarang(prevBarang => prevBarang.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const handleUpdate = (updatedItem) => {
    setBarang(prevBarang =>
      prevBarang.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(updatedItem);
  };

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} barang={barang} setBarang={setBarang} />}
            </Stack.Screen>
            <Stack.Screen name="TambahBarang">
              {props => <TambahBarang {...props} onAdd={handleAdd} />}
            </Stack.Screen>
            <Stack.Screen name="HapusBarang">
              {props => (
                <HapusBarang
                  {...props}
                  item={selectedItem}
                  onDelete={handleDelete}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="EditBarang">
              {props => (
                <EditBarang
                  {...props}
                  item={selectedItem}
                  onSave={handleUpdate}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="LihatBarang">
              {props => (
                <LihatBarang
                  {...props}
                  setSelectedItem={setSelectedItem}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
