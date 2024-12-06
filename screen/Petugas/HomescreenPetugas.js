import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


export default function HomescreenPetugas() {
    return (
      <View style={styles.container}>
      <Text>Ini Acc</Text>
      <StatusBar style="auto" />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
