import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Button, Text, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    name: "",
    location: "",
    gender: "",
    age: "",
    profession: "",
  });
  const [userEmail, setUserEmail] = useState('');
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [hasAlertShown, setHasAlertShown] = useState(false);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);

      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              name: data.name || "",
              location: data.location || "",
              gender: data.gender || "",
              age: data.age || "",
              profession: data.profession || "",
            });
            setIsProfileCompleted(data.isProfileCompleted || false);
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      };

      fetchUserData();
    }
  }, [userEmail, db, auth]);

  useEffect(() => {
    if (isProfileCompleted) {
      return;
    }
    const checkPopupStatus = async () => {
      const alertStatus = await AsyncStorage.getItem('alertShown');
      if (alertStatus !== 'true' && !isProfileCompleted) {
        Alert.alert(
          'Lengkapi Data Diri',
          'Anda belum melengkapi data diri. Harap isi semua informasi.',
          [
            { text: 'Isi Sekarang', onPress: () => navigation.navigate('DataUser') },
            { text: 'Nanti', style: 'cancel' },
          ]
        );
        await AsyncStorage.setItem('alertShown', 'true'); 
      }
    };
  
    checkPopupStatus();
  }, [isProfileCompleted, navigation]);
  

  const checkUserData = (userData, navigation) => {
    if (!userData || !userData.name || !userData.location || !userData.gender || !userData.age || !userData.profession) {
      Alert.alert(
        "Data Tidak Lengkap",
        "Harap lengkapi semua data pribadi Anda untuk melanjutkan.",
        [
          {
            text: "OK", 
            onPress: () => {
              console.log("Popup ditutup");
              navigation.navigate('DataUser'); 
            }
          }
        ]
      );
      return false;
    }
    return true;
  };

  const handleNavigation = (destination) => {
    if (checkUserData(userData, navigation)) {
      if (destination === 'DataUser') {
        navigation.navigate('DataUser', { userData });
      } else {
        console.log(`Navigasi ke ${destination}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Card style={styles.header}>
          <Card.Content style={styles.userInfo}>
            <Title style={styles.userName}>{userData.name || "Nama Belum Diisi"}</Title>
            <Paragraph style={styles.userDetails}>
              {userData.location && userData.gender && userData.age
                ? `${userData.location} - ${userData.gender}, ${userData.age} tahun`
                : "Lokasi, gender, atau umur belum diisi"}
            </Paragraph>
            <Paragraph style={styles.userDetails}>{userData.profession || "Profesi belum diisi"}</Paragraph>
          </Card.Content>
          <Avatar.Image
            source={{ uri: "https://via.placeholder.com/100" }}
            size={60}
            style={styles.profileImage}
          />
        </Card>

        <Card style={styles.nicPointContainer}>
          <Card.Content>
            <Text style={styles.nicPointText}>NicPoint Saldo: 15.000 Poin</Text>
          </Card.Content>
        </Card>

        <Card style={styles.programContainer}>
          <Card.Content>
            <Title style={styles.programTitle}>Program RehabilitasiAsik</Title>
            <Paragraph style={styles.programSubtitle}>Rehabilitasi Online</Paragraph>
            <Paragraph style={styles.programDescription}>
              Kamu tergabung dengan Program Rehabilitasi Online NicGooway
            </Paragraph>
            <Text style={styles.programDetails}>Ruang Program: 27 Juni 2024 - 27 Agustus 2024</Text>
            <Text style={styles.programDetails}>Sisa Hari: 31 Hari Tersisa</Text>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Layanan</Text>
        <Card style={styles.serviceContainer}>
          {[ 
            { title: "Konsultasi", subtitle: "600+ Tenaga Ahli", icon: "https://via.placeholder.com/80" },
            { title: "Asesmen", subtitle: "100+ Rumah Sakit", icon: "https://via.placeholder.com/80" },
            { title: "Riwayat", subtitle: "Riwayat Layanan", icon: "https://via.placeholder.com/80" },
            { title: "Artikel", subtitle: "100+ Artikel", icon: "https://via.placeholder.com/80" },
          ].map((item, index) => (
            <Card
              key={index}
              style={styles.serviceCard}
              onPress={() => handleNavigation(item.title)}
            >
              <Card.Cover source={{ uri: item.icon }} style={styles.serviceIcon} />
              <Card.Content>
                <Title style={styles.serviceTitle}>{item.title}</Title>
                <Paragraph style={styles.serviceSubtitle}>{item.subtitle}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </Card>

        <Text style={styles.sectionTitle}>Tantangan</Text>
        <Card style={styles.challengeContainer}>
          <Button mode="contained" onPress={() => handleNavigation("tantangan")}>
            Baca artikel selama 5 menit
          </Button>
          <Text>200 NicPoint</Text>
        </Card>
        <Card style={styles.challengeContainer}>
          <Button mode="contained" onPress={() => handleNavigation("tantangan")}>
            Lengkapi data dirimu
          </Button>
          <Text>200 NicPoint</Text>
        </Card>

        <Text style={styles.sectionTitle}>Main Game Yuk!</Text>
        <Card style={styles.gameContainer}>
          <Button onPress={() => handleNavigation("game")}>
            <Card.Cover source={{ uri: "https://via.placeholder.com/300x100" }} style={styles.gameBanner} />
          </Button>
        </Card>
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
    marginLeft: 10,
  },
  nicPointContainer: {
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
  programSubtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  programDescription: {
    fontSize: 12,
    color: "#555",
    marginBottom: 10,
  },
  programDetails: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceContainer: {
    marginBottom: 20,
  },
  serviceCard: {
    marginBottom: 10,
    flexDirection: "row",
  },
  serviceIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceSubtitle: {
    fontSize: 14,
  },
  challengeContainer: {
    marginBottom: 20,
  },
  gameContainer: {
    marginBottom: 20,
  },
  gameBanner: {
    height: 100,
    resizeMode: "cover",
  },
});
