import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../firebase';  
import { doc, deleteDoc } from 'firebase/firestore';
import { themeColors } from '../../theme/theme';

export default function HapusBarang({ route, navigation }) {
  const { item } = route.params;

  // Fungsi untuk menangani penghapusan barang
  const handleDelete = async () => {
    try {
      const itemRef = doc(db, 'barang', item.id);  // Referensi barang yang akan dihapus
      await deleteDoc(itemRef);  // Hapus barang dari Firestore

      navigation.goBack();  // Kembali setelah barang berhasil dihapus
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
        {/* Teks konfirmasi hapus */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          color: themeColors.text,
          marginBottom: 24
        }}>
          Apakah Anda yakin ingin menghapus barang ini?
        </Text>

        {/* Tombol Hapus Barang */}
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            paddingVertical: 14,
            backgroundColor: themeColors.danger,
            borderRadius: 16,
            width: '100%',
            alignItems: 'center',
            shadowColor: themeColors.danger,
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5
          }}
        >
          <Text style={{
            color: themeColors.textSecondary,
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Hapus Barang
          </Text>
        </TouchableOpacity>

        {/* Tombol Batal */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingVertical: 12,
            backgroundColor: themeColors.secondary,
            borderRadius: 16,
            marginTop: 20,
            width: '100%',
            alignItems: 'center',
            shadowColor: themeColors.secondary,
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3
          }}
        >
          <Text style={{
            color: themeColors.text,
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            Batal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
