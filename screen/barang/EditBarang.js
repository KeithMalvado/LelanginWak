import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { db } from '../firebase';  
import { doc, updateDoc } from 'firebase/firestore';
import { themeColors } from '../../theme/theme';

export default function EditBarang({ route, navigation }) {
  const { item } = route.params; 
  const [name, setName] = useState(item.name); 

  const handleSave = async () => {
    try {
      const itemRef = doc(db, 'barang', item.id); 
      await updateDoc(itemRef, { name: name }); 
      navigation.goBack();  
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 28 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          color: themeColors.primary,
          marginBottom: 32
        }}>
          Edit Barang
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nama Barang"
          style={{
            padding: 16,
            backgroundColor: themeColors.secondary,
            borderRadius: 16,
            fontSize: 16,
            color: themeColors.textSecondary,
            marginBottom: 24,
            shadowColor: themeColors.textSecondary,
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3
          }}
        />
        <TouchableOpacity
          onPress={handleSave}
          style={{
            paddingVertical: 14,
            backgroundColor: themeColors.button,
            borderRadius: 16,
            marginBottom: 24,
            shadowColor: themeColors.button,
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5
          }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: themeColors.textSecondary
          }}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingVertical: 12,
            backgroundColor: themeColors.danger,
            borderRadius: 16,
            alignItems: 'center',
            shadowColor: themeColors.danger,
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 3
          }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: themeColors.textSecondary
          }}>
            Batal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
