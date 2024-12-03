import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { themeColors } from '../../theme/theme'; 
import { useNavigation } from '@react-navigation/native';
import { db, collection, addDoc, serverTimestamp } from '../firebase/index'; 

export default function TambahUser({ onAdd }) {
  const [namaUser, setnamaUser] = useState('');
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (namaUser.trim()) {
      try {
        await addDoc(collection(db, 'user'), {
          name: namaUser,
          createdAt: serverTimestamp(),
        });
        setnamaUser('');
        if (onAdd && typeof onAdd === 'function') {
          onAdd();
        } else {
          console.warn('onAdd is not defined or not a function');
        }
      } catch (error) {
        console.error('Error menambahkan user: ', error);
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
          Tambah user
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
            Nama user
          </Text>
          <TextInput
            value={namaUser}
            onChangeText={setnamaUser}
            placeholder="Masukkan Nama user"
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
              Tambah user
            </Text>
          </TouchableOpacity>
{/* 
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <Text style={{ color: themeColors.text }}>Sudah punya user?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontWeight: 'bold', color: themeColors.primary }}> Kembali</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
