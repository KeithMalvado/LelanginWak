import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { themeColors } from '../../../theme/theme'; 
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function ScreenDataUser({ onAdd }) {
  const [namaUser, setNamaUser] = useState('');
  const [alamatUser, setAlamatUser] = useState('');
  const [ktpUser, setKtpUser] = useState('');
  const [phoneUser, setPhoneUser] = useState(''); // Input untuk nomor handphone
  const [profileImage, setProfileImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [hasAlertShown, setHasAlertShown] = useState(false); // Flag untuk mencegah popup dua kali

  const navigation = useNavigation();
  const route = useRoute();
  const db = getFirestore();
  const auth = getAuth();

  const userId = route.params?.userId; 

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setNamaUser(data.name || '');
            setAlamatUser(data.address || '');
            setKtpUser(data.ktp || '');
            setPhoneUser(data.phone || ''); // Ambil nomor handphone dari Firebase
            setProfileImage(data.profileImage || null);
            setIsProfileCompleted(data.isProfileCompleted || false);
          } else {
            Alert.alert('Error', 'User not found.');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      };

      fetchUserData();
    }

    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email); // Get the user's email
    }
  }, [userId, db, auth]);

  useEffect(() => {
    // Show the popup only if profile is not completed, email is present, and alert has not been shown
    if (userEmail && !isProfileCompleted && !hasAlertShown) {
      Alert.alert(
        'Lengkapi Data Diri',
        'Anda belum melengkapi data diri. Harap isi semua informasi.',
        [
          { text: 'OK', onPress: () => setHasAlertShown(true) } // Set flag to true after alert is shown
        ]
      );
    }
  }, [userEmail, isProfileCompleted, hasAlertShown]);

  const handleAdd = async () => {
    if (!namaUser || !alamatUser || !ktpUser || !phoneUser) {
      Alert.alert('Error', 'Semua data wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      if (userId) {
        // Update the existing user data and mark profile as completed
        await updateDoc(doc(db, 'users', userId), {
          name: namaUser,
          address: alamatUser,
          ktp: ktpUser,
          phone: phoneUser, // Update nomor handphone
          profileImage: profileImage,
          isProfileCompleted: true, // Set profile as completed
        });
        Alert.alert('Success', 'User data updated successfully');
      } else {
        // Add new user data if no userId
        await addDoc(collection(db, 'users'), {
          name: namaUser,
          address: alamatUser,
          ktp: ktpUser,
          phone: phoneUser, // Add nomor handphone
          profileImage: profileImage,
          createdAt: serverTimestamp(),
          email: userEmail,
          isProfileCompleted: false, // Initially set profile as incomplete
        });
        Alert.alert('Success', 'User added successfully');
      }

      // Clear fields and call the onAdd callback if provided
      setNamaUser('');
      setAlamatUser('');
      setKtpUser('');
      setPhoneUser(''); // Clear nomor handphone
      setProfileImage(null);
      
      if (onAdd && typeof onAdd === 'function') {
        onAdd();
      }

      navigation.goBack(); 
    } catch (error) {
      console.error('Error adding or updating user: ', error);
      Alert.alert('Error', 'There was an issue saving the user data.');
    } finally {
      setLoading(false);
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
          {userId ? 'Edit User' : 'Tambah User'}
        </Text>

        <View style={{ marginHorizontal: 28 }}>
          <TextInput
            value={namaUser}
            onChangeText={setNamaUser}
            placeholder="Masukkan Nama user"
            style={inputStyle}
          />
          <TextInput
            value={alamatUser}
            onChangeText={setAlamatUser}
            placeholder="Masukkan Alamat"
            style={inputStyle}
          />
          <TextInput
            value={ktpUser}
            onChangeText={setKtpUser}
            placeholder="Masukkan Nomor KTP"
            style={inputStyle}
          />
          <TextInput
            value={phoneUser}
            onChangeText={setPhoneUser}
            placeholder="Masukkan Nomor Handphone"
            style={inputStyle}
          />
          <TouchableOpacity
            onPress={handleAdd}
            style={{
              paddingVertical: 12,
              backgroundColor: themeColors.button,
              borderRadius: 16,
              marginBottom: 16,
              alignItems: 'center',
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
              {loading ? 'Loading...' : 'Simpan'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const inputStyle = {
  padding: 16,
  backgroundColor: themeColors.secondary,
  color: themeColors.textSecondary,
  borderRadius: 16,
  marginBottom: 16,
  fontSize: 16,
};
