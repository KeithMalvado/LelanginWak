import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../theme/theme'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: themeColors.bg}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={{backgroundColor: themeColors.bg, padding: 10, borderBottomLeftRadius: 20, marginLeft: 16}}
          >
            <ArrowLeftIcon size="20" color={themeColors.textSecondary}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image source={require('../assets/images/welcome.png')} style={{width:200, height: 200}}/>
        </View>
        <View style={{flex: 1, backgroundColor: themeColors.text, paddingHorizontal: 32, paddingTop: 32, borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
          <View style={{marginBottom: 16}}>
            <Text style={{color: themeColors.primary, marginBottom: 8}}>Nama Lengkap</Text>
            <TextInput
              style={{padding: 16, backgroundColor: themeColors.secondary, color: themeColors.textSecondary, borderRadius: 16, marginBottom: 12}}
              placeholder='Masukan Nama Lengkap'
            />
            <Text style={{color: themeColors.primary, marginBottom: 8}}>Alamat Email</Text>
            <TextInput
              style={{padding: 16, backgroundColor: themeColors.secondary, color: themeColors.textSecondary, borderRadius: 16, marginBottom: 12}}
              placeholder='Masukan Email'
            />
            <Text style={{color: themeColors.primary, marginBottom: 8}}>Password</Text>
            <TextInput
              style={{padding: 16, backgroundColor: themeColors.secondary, color: themeColors.textSecondary, borderRadius: 16, marginBottom: 16}}
              secureTextEntry
              placeholder='Masukan Password'
            />
            <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 16}}>
              <Text style={{color: themeColors.textSecondary}}>Lupa Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingVertical: 12, backgroundColor: themeColors.button, borderRadius: 16, marginBottom: 16}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: themeColors.textSecondary}}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
