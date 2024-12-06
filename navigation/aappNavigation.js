import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screen/HomeScreen'
import WelcomeScreen from '../screen/WelcomeScreen'
import LoginScreen from '../screen/LoginScreen'
import SignUpScreen from '../screen/SignUpScreen'

export default function appNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouterName='Welcome'>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}/>
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen}/>
            <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}/>
            <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}