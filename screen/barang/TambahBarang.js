import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { themeColors } from '../../theme/theme'; 
import { useNavigation } from '@react-navigation/native';
import { db, collection, addDoc, serverTimestamp } from '../firebase/index'; 

export default function TambahBarang({ onAdd }) {
  const [namaBarang, setNamaBarang] = useState('');
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (namaBarang.trim()) {
      try {
        await addDoc(collection(db, 'barang'), {
          name: namaBarang,
          createdAt: serverTimestamp(),
        });
        setNamaBarang('');
        if (onAdd && typeof onAdd === 'function') {
          onAdd();
        } else {
          console.warn('onAdd is not defined or not a function');
        }
      } catch (error) {
        console.error('Error menambahkan barang: ', error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: 'space-around', marginTop: 16, marginBottom: 16 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            color: themeColors.text,
            marginBottom: 16,
          }}
        >
          Tambah Barang
        </Text>

        <View style={{ marginHorizontal: 28 }}>
          <Text
            style={{
              fontSize: 18,
              color: themeColors.text,
              marginBottom: 8,
              fontWeight: 'bold',
            }}
          >
            Nama Barang
          </Text>
          <TextInput
            value={namaBarang}
            onChangeText={setNamaBarang}
            placeholder="Masukkan Nama Barang"
            style={{
              padding: 16,
              backgroundColor: themeColors.secondary,
              color: themeColors.textSecondary,
              borderRadius: 16,
              marginBottom: 16,
              fontSize: 16,
            }}
          />

          <TouchableOpacity
            onPress={handleAdd}
            style={{
              paddingVertical: 12,
              backgroundColor: themeColors.button,
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: themeColors.textSecondary,
              }}
            >
              Tambah Barang
            </Text>
          </TouchableOpacity>
{/* 
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <Text style={{ color: themeColors.text }}>Sudah punya barang?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontWeight: 'bold', color: themeColors.primary }}> Kembali</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
