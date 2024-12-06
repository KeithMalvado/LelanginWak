import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../firebase';
import { themeColors } from '../../theme/theme';
import { ref, remove } from 'firebase/database';

export default function HapusBarang({ route, navigation }) {
  const { item } = route.params;

  const handleDelete = async () => {
    try {
      await remove(ref(db, `barang/${item.id}`));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: themeColors.text, marginBottom: 24 }}>
          Apakah Anda yakin ingin menghapus barang ini?
        </Text>
        <TouchableOpacity onPress={handleDelete} style={{ paddingVertical: 14, backgroundColor: themeColors.danger, borderRadius: 16, width: '100%' }}>
          <Text style={{ color: themeColors.textSecondary, fontSize: 18, fontWeight: 'bold' }}>Hapus Barang</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 12, backgroundColor: themeColors.secondary, borderRadius: 16, marginTop: 20, width: '100%' }}>
          <Text style={{ color: themeColors.text, fontSize: 18, fontWeight: 'bold' }}>Batal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
