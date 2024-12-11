import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../screen/firebase/index';
import { themeColors } from '../theme/theme';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home');
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    if (email === 'petugas' && password === 'petugas') {
      console.log('Login berhasil: Petugas');
      navigation.replace('HCpetugas');
      return;
    }
    if (email === 'admin' && password === 'admin') {
      console.log('Login berhasil: Admin');
      navigation.replace('HomeAdmin');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        console.log('Login berhasil:', user.email);
        navigation.replace('Home');
      } else {
        Alert.alert('Verifikasi diperlukan', 'Silakan verifikasi email Anda terlebih dahulu.');
        await signOut(auth);
      }
    } catch (error) {
      Alert.alert('Login gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: themeColors.bg,
              padding: 10,
              borderBottomLeftRadius: 20,
              marginLeft: 16,
            }}
          >
            <ArrowLeftIcon size="20" color={themeColors.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/welcome.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 30,
            paddingTop: 30,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: themeColors.primary, marginLeft: 10 }}>Alamat Email</Text>
            <TextInput
              style={{
                padding: 10,
                backgroundColor: '#f1f1f1',
                borderRadius: 25,
                marginBottom: 15,
              }}
              placeholder="Masukan Alamat Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={{ color: themeColors.primary, marginLeft: 10 }}>Password</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f1f1f1',
                borderRadius: 25,
                paddingHorizontal: 10,
              }}
            >
              <TextInput
                style={{ flex: 1, paddingVertical: 10 }}
                secureTextEntry={!showPassword}
                placeholder="Masukan Password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color={themeColors.TextInput}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ alignItems: 'flex-end', marginVertical: 10 }}>
              <Text style={{ color: themeColors.primary }}>Lupa Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                backgroundColor: themeColors.button,
                borderRadius: 25,
              }}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: themeColors.text,
                  }}
                >
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
            <Text style={{ color: themeColors.bg, borderRadius: 25 }}>Belum Memiliki Akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: themeColors.button, fontWeight: 'bold' }}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
