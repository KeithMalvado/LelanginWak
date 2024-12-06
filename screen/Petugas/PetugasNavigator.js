import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomescreenPetugas from "./HomescreenPetugas";
import PetugasEdit from "./PetugasEdit";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themeColors } from "../../theme/theme";
const Tab = createBottomTabNavigator();

export default function PetugasNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Barang Masuk") {
            iconName = "cube"; 
          } else if (route.name === "Edit Barang") {
            iconName = "create"; 
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Barang Masuk" component={HomescreenPetugas} />
      <Tab.Screen name="Edit Barang" component={PetugasEdit} />
    </Tab.Navigator>
  );
}
