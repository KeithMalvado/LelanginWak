import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../screen/firebase/index';
import { themeColors } from '../theme/theme';

const Registrasi = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi.');
      return;
    }

    const passwordPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!passwordPattern.test(password)) {
      Alert.alert('Error', 'Harap memberikan suatu karakter pada password.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      Alert.alert('Sukses', 'Akun berhasil dibuat. Silakan verifikasi email Anda.');
      navigation.navigate('Login'); 
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.textSecondary, marginBottom: 20, textAlign: 'center' }}>
        Halaman Registrasi
      </Text>
      <TextInput
        style={{
          padding: 16,
          backgroundColor: themeColors.secondary,
          color: themeColors.textSecondary,
          borderRadius: 16,
          marginBottom: 12,
        }}
        placeholder="Masukan Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{
          padding: 16,
          backgroundColor: themeColors.secondary,
          color: themeColors.textSecondary,
          borderRadius: 16,
          marginBottom: 12,
        }}
        placeholder="Masukan Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={{
          paddingVertical: 16,
          backgroundColor: themeColors.button,
          borderRadius: 16,
          marginBottom: 20,
          alignItems: 'center',
        }}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeColors.textSecondary }}>
          {loading ? 'Loading...' : 'Registrasi'}
        </Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', color: themeColors.textSecondary }}>
        Sudah punya akun?{' '}
        <Text
          style={{ color: themeColors.primary, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default Registrasi;
