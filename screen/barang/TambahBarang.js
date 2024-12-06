import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { themeColors } from '../../theme/theme';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

export default function TambahBarang({ onAdd }) {
  const [namaBarang, setNamaBarang] = useState('');

  const handleAdd = async () => {
    if (namaBarang.trim()) {
      try {
        await push(ref(db, 'barang'), { name: namaBarang });
        setNamaBarang('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 28 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: themeColors.text, marginBottom: 16 }}>Tambah Barang</Text>
        <TextInput
          value={namaBarang}
          onChangeText={setNamaBarang}
          placeholder="Masukkan Nama Barang"
          style={{ padding: 16, backgroundColor: themeColors.secondary, borderRadius: 16, marginBottom: 24 }}
        />
        <TouchableOpacity onPress={handleAdd} style={{ paddingVertical: 12, backgroundColor: themeColors.button, borderRadius: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: themeColors.textSecondary }}>Tambah Barang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
