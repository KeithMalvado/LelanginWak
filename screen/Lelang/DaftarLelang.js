import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { realtimeDb } from '../../screen/firebase';
import { themeColors } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const normalizeString = (str) => str?.trim()?.toLowerCase();

const DaftarLelang = ({ navigation }) => {
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    }

    const barangRef = ref(realtimeDb, 'barang');
    const unsubscribe = onValue(barangRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const barangArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        barangArray.sort((a, b) => (a.status === 'selesai' ? 1 : -1));
        setBarangList(barangArray);
      } else {
        setBarangList([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBid = (item) => {
    if (item.status === 'selesai') {
      if (normalizeString(item.winner) === normalizeString(userId)) {
        navigation.navigate('Pembayaran', {
          barangId: item.id,
          nominal: item.hargaSaatIni,
        });
      } else {
        Alert.alert('Lelang Ditutup', 'Anda bukan pemenang lelang ini.');
      }
    } else {
      navigation.navigate('ikutlelang', { barangId: item.id });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.button} />;
  }

  if (barangList.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Tidak ada barang untuk dilelang</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Daftar Barang Lelang</Text>

      <FlatList
        data={barangList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.namaBarang}</Text>
            <Text style={styles.cardText}>Harga Saat Ini: {item.hargaSaatIni}</Text>
            <Text style={styles.cardText}>Harga Maksimum: {item.hargaTertinggi}</Text>
            <Text style={styles.cardText}>
              Status: {item.status === 'selesai' ? 'Lelang Selesai' : 'Lelang Berlangsung'}
            </Text>

            <TouchableOpacity
              onPress={() => handleBid(item)}
              style={[
                styles.button,
                {
                  backgroundColor:
                    item.status === 'selesai'
                      ? normalizeString(item.winner) === normalizeString(userId)
                        ? themeColors.button
                        : 'gray'
                      : themeColors.button,
                },
              ]}
              disabled={item.status === 'selesai' && normalizeString(item.winner) !== normalizeString(userId)}
            >
              <Text style={styles.buttonText}>
                {item.status === 'selesai'
                  ? normalizeString(item.winner) === normalizeString(userId)
                    ? 'Pembayaran'
                    : 'Lelang Selesai'
                  : 'Ikut Lelang'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('RiwayatLelang', { barangId: item.id })}
              style={[styles.button, { backgroundColor: themeColors.button, marginTop: 10 }]}
            >
              <Text style={styles.buttonText}>Riwayat Lelang</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navButton}>
          <Ionicons name="home-outline" size={30} color="#000" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LihatBarang')} style={styles.navButton}>
          <Ionicons name="search-outline" size={30} color="#000" />
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navButton}>
          <Ionicons name="person-outline" size={30} color="#000" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.textSecondary,
    marginBottom: 35,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: themeColors.textSecondary,
  },
  card: {
    padding: 16,
    backgroundColor: themeColors.secondary,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.textSecondary,
  },
  cardText: {
    color: themeColors.textSecondary,
  },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.text,
  },
  bottomNav: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: themeColors.text,
    paddingHorizontal: 30,
  },
  navButton: {
    alignItems: "center",
  },
});

export default DaftarLelang;