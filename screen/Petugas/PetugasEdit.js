import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { themeColors } from "../../theme/theme";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function LihatUser({ setSelectedItem }) {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  if (!setSelectedItem) {
    console.warn("setSelectedItem is not defined! Using fallback.");
    setSelectedItem = () => {};
  }

  useEffect(() => {
    const q = query(collection(db, "barang"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const barangData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBarang(barangData); 
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item); 
    navigation.navigate("EditBarang", { item });
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item); 
    navigation.navigate("HapusBarang", { item });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: themeColors.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={themeColors.primary} />
      </SafeAreaView>
    );
  }

  if (barang.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: themeColors.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: themeColors.text, fontSize: 18 }}>
          Tidak ada barang yang tersedia.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: themeColors.bg,
            padding: 10,
            borderBottomLeftRadius: 20,
            marginLeft: 16,
          }}
        >
          <ArrowLeftIcon size="20" color={themeColors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: themeColors.text,
          paddingHorizontal: 32,
          paddingTop: 32,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <Text
          style={{
            color: themeColors.primary,
            fontSize: 24,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Daftar Barang Lelang
        </Text>

        <FlatList
          data={barang}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                backgroundColor: themeColors.secondary,
                borderRadius: 16,
                marginVertical: 8,
                shadowColor: themeColors.secondary,
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Text style={{ color: themeColors.textSecondary, fontSize: 18 }}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSelectItem(item)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: themeColors.primary,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: themeColors.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      color: themeColors.textSecondary,
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteItem(item)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 24,
                    backgroundColor: themeColors.danger,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: themeColors.danger,
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 5,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: themeColors.textSecondary,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
