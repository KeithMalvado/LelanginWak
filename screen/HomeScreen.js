import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { themeColors } from '../theme/theme';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import TambahBarang from './barang/TambahBarang';
import LihatBarang from './barang/LihatBarang';
import SignUpScreen from './SignUpScreen'; 

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTambahBarang = (name) => {
    console.log('Barang ditambahkan');
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.button }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: themeColors.button,
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
          <Text style={{ color: themeColors.primary, fontSize: 24, textAlign: 'center', marginBottom: 16 }}>
            Kelola Barang Lelang
          </Text>

          {/* Tambah Barang */}
          <TambahBarang onAdd={handleTambahBarang} />

          {/* Lihat Barang */}
          <LihatBarang setSelectedItem={setSelectedItem} />

          {/* Tombol Sign Up jika ingin berpindah ke halaman Sign Up */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              paddingVertical: 12,
              backgroundColor: themeColors.button,
              borderRadius: 16,
              marginTop: 32,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: themeColors.textSecondary }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
