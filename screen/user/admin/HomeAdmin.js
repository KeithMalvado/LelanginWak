import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function HomeAdmin() {
  const navigation = useNavigation(); 
  const [users, setUsers] = useState([]);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(getFirestore(), 'users'));
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
        Alert.alert('Error', 'Failed to load users.');
      }
    };
    
    fetchUsers();
  }, []);

  const handleFeatureNavigation = (feature) => {
    if (!isProfileCompleted) {
      Alert.alert(
        'Lengkapi Data Diri',
        'Anda belum melengkapi data diri. Harap isi semua informasi sebelum menggunakan fitur ini.',
        [{ text: 'OK', onPress: () => navigation.navigate('DataUser') }]
      );
      return;
    }
    navigation.navigate(feature);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nama Admin</Text>
            <Text style={styles.userDetails}>Lokasi - Gender, Umur tahun</Text>
            <Text style={styles.userDetails}>Profesi Admin</Text>
          </View>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.nicPointContainer}>
          <Text style={styles.nicPointText}>NicPoint Saldo: 15.000 Poin</Text>
        </View>

        <View style={styles.programContainer}>
          <Text style={styles.programTitle}>Program Admin</Text>
          <View style={styles.programCard}>
            <Text style={styles.programSubtitle}>Rehabilitasi Online</Text>
            <Text style={styles.programDescription}>Keterangan Program</Text>
            <Text style={styles.programDetails}>Durasi: 27 Juni - 27 Agustus 2024</Text>
            <Text style={styles.programDetails}>Sisa Hari: 31 Hari</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Layanan</Text>
        <View style={styles.serviceContainer}>
          {[
            { title: "Konsultasi", subtitle: "600+ Tenaga Ahli", icon: "https://via.placeholder.com/80" },
            { title: "Asesmen", subtitle: "100+ Rumah Sakit", icon: "https://via.placeholder.com/80" },
            { title: "Riwayat", subtitle: "Riwayat Layanan", icon: "https://via.placeholder.com/80" },
            { title: "Artikel", subtitle: "100+ Artikel", icon: "https://via.placeholder.com/80" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceCard}
              onPress={() => handleFeatureNavigation(item.title)}
            >
              <Image source={{ uri: item.icon }} style={styles.serviceIcon} />
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Tantangan</Text>
        <View style={styles.challengeContainer}>
          <TouchableOpacity
            style={styles.challengeCard}
            onPress={() => console.log("Navigasi ke tantangan")}
          >
            <Text>Baca artikel selama 5 menit</Text>
            <Text>200 NicPoint</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.challengeCard}
            onPress={() => console.log("Navigasi ke tantangan")}
          >
            <Text>Lengkapi data dirimu</Text>
            <Text>200 NicPoint</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Main Game Yuk!</Text>
        <View style={styles.gameContainer}>
          <TouchableOpacity onPress={() => console.log("Navigasi ke game")}>
            <Image
              source={{ uri: "https://via.placeholder.com/300x100" }}
              style={styles.gameBanner}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userDetails: {
    fontSize: 14,
    color: "#555",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },
  nicPointContainer: {
    backgroundColor: "#eef6fc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  nicPointText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  programContainer: {
    marginBottom: 20,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  programCard: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
  },
  programSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  programDescription: {
    color: "#fff",
    marginBottom: 10,
  },
  programDetails: {
    color: "#fff",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  serviceSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  challengeContainer: {
    marginBottom: 20,
  },
  challengeCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  gameContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  gameBanner: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
});
