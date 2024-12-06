import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomescreenPetugas from "./screen/Petugas/HomescreenPetugas";
import WelcomeScreen from "./screen/WelcomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignUpScreen from "./screen/SignUpScreen";
import HomeScreen from "./screen/HomeScreen";
import TambahBarang from "./screen/barang/TambahBarang";
import HapusBarang from "./screen/barang/HapusBarang";
import EditBarang from "./screen/barang/EditBarang";
import LihatBarang from "./screen/barang/LihatBarang";
import TambahUser from "./screen/user/TambahUser";
import HapusUser from "./screen/user/HapusUser";
import EditUser from "./screen/user/EditUser";
import LihatUser from "./screen/user/LihatUser";
import ScreenDataUser from "./screen/user/data/ScreenDataUser";
import PetugasNavigator from "./screen/Petugas/PetugasNavigator";
const Stack = createNativeStackNavigator();

export default function App() {
  const [barang, setBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddBarang = (name) => {
    const newItem = { id: Date.now().toString(), name };
    setBarang((prevBarang) => [...prevBarang, newItem]);
  };

  const handleDeleteBarang = (id) => {
    setBarang((prevBarang) => prevBarang.filter((item) => item.id !== id));
    setSelectedBarang(null);
  };

  const handleUpdateBarang = (updatedItem) => {
    setBarang((prevBarang) =>
      prevBarang.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setSelectedBarang(updatedItem);
  };

  const handleAddUser = (name) => {
    const newUser = { id: Date.now().toString(), name };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="HCpetugas" component={PetugasNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="DataUser" component={ScreenDataUser} />
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="TambahBarang">
          {(props) => <TambahBarang {...props} onAdd={handleAddBarang} />}
        </Stack.Screen>
        <Stack.Screen name="HapusBarang">
          {(props) => (
            <HapusBarang
              {...props}
              item={selectedBarang}
              onDelete={handleDeleteBarang}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditBarang">
          {(props) => (
            <EditBarang
              {...props}
              item={selectedBarang}
              onSave={handleUpdateBarang}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="LihatBarang">
          {(props) => (
            <LihatBarang
              {...props}
              barang={barang}
              setSelectedItem={setSelectedBarang}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TambahUser">
          {(props) => <TambahUser {...props} onAdd={handleAddUser} />}
        </Stack.Screen>
        <Stack.Screen name="HapusUser">
          {(props) => (
            <HapusUser
              {...props}
              user={selectedUser}
              onDelete={handleDeleteUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditUser">
          {(props) => (
            <EditUser
              {...props}
              user={selectedUser}
              onSave={handleUpdateUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="LihatUser">
          {(props) => (
            <LihatUser
              {...props}
              users={users}
              setSelectedUser={setSelectedUser}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DataDiri">
          {(props) => <ScreenDataUser {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
