import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { themeColors } from '../../theme/theme';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

export default function LihatBarang({ setSelectedItem }) {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const barangRef = ref(db, 'barang');
    const unsubscribe = onValue(barangRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setBarang(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={themeColors.primary} />
      </SafeAreaView>
    );
  }

  if (barang.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: themeColors.text, fontSize: 18 }}>Tidak ada barang yang tersedia.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <FlatList
        data={barang}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16, backgroundColor: themeColors.secondary, borderRadius: 16, marginVertical: 8 }}>
            <Text style={{ color: themeColors.textSecondary, fontSize: 18 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
              <TouchableOpacity onPress={() => navigation.navigate('EditBarang', { item })} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: themeColors.primary, borderRadius: 12 }}>
                <Text style={{ color: themeColors.textSecondary, fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('HapusBarang', { item })} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: themeColors.danger, borderRadius: 12 }}>
                <Text style={{ color: themeColors.textSecondary, fontWeight: 'bold' }}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
