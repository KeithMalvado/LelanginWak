import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView, StyleSheet } from "react-native";
import { ref, get } from "firebase/database";
import { realtimeDb } from "../../screen/firebase/index";
import { themeColors } from "../../theme/theme";
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { getAuth } from "firebase/auth";

const Pembayaran = ({ route }) => {
  const { barangId } = route.params;
  console.log("barangId from route params:", barangId);

  const getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  const [barang, setBarang] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      Alert.alert("Error", "User ID tidak ditemukan.");
      console.log("User ID tidak ditemukan.");
      return;
    }

    const fetchBarangDetail = async () => {
      try {
        console.log("Fetching barang details for ID:", barangId);
        const barangRef = ref(realtimeDb, `barang/${barangId}`);
        const snapshot = await get(barangRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched barang data:", data);
          setBarang(data);

          if (data.winner === userId) {
            setIsWinner(true);
          }
        } else {
          Alert.alert("Error", "Barang tidak ditemukan.");
          console.log("Barang not found in database.");
        }
      } catch (error) {
        console.error("Error fetching barang details: ", error);
        Alert.alert("Error", "Terjadi kesalahan saat mengambil data barang.");
      }
    };

    fetchBarangDetail();
  }, [barangId, userId]);

  const handlePayment = async () => {
    if (!barang || !barang.hargaSaatIni || isNaN(barang.hargaSaatIni)) {
      Alert.alert("Error", "Harga barang tidak valid.");
      console.log("Harga barang tidak valid:", barang ? barang.hargaSaatIni : "Data barang kosong");
      return;
    }
  
    console.log("Harga barang yang akan digunakan:", barang.hargaSaatIni);
  
    try {
      console.log("Mengirim permintaan untuk membuat payment intent...");
      const paymentIntentResponse = await fetch('https://a496-66-96-225-166.ngrok-free.app/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(barang.hargaSaatIni * 100),
          currency: 'idr',
          orderId: barangId,
          productName: barang.namaBarang, 
          productDescription: barang.deskripsi, 
        }),
      });
      
  
      if (!paymentIntentResponse.ok) {
        const errorText = await paymentIntentResponse.text();
        console.error("Error dalam permintaan pembayaran:", paymentIntentResponse.status, errorText);
        Alert.alert("Error", "Gagal membuat payment intent: " + errorText);
        return;
      }
  
      const responseJson = await paymentIntentResponse.json();
      console.log("Response dari server:", responseJson);
  
      const { clientSecret } = responseJson;
  
      if (!clientSecret) {
        console.error("clientSecret tidak ditemukan dalam respons.");
        Alert.alert("Error", "Gagal mendapatkan clientSecret.");
        return;
      }
  
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Nama Toko Anda',
        customFlow: true,
      });
  
      if (error) {
        console.error("Error in payment sheet initialization:", error);
        Alert.alert("Error", "Gagal menginisialisasi pembayaran.");
        return;
      }
  
      const { error: presentError } = await presentPaymentSheet();
  
      if (presentError) {
        console.error("Pembayaran gagal:", presentError);
        Alert.alert("Error", "Pembayaran gagal.");
      } else {
        Alert.alert("Success", "Pembayaran berhasil!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Terjadi kesalahan saat memproses pembayaran.");
    }
  };
  
  

  if (!barang) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg, justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20, textAlign: 'center' }}>
        Pembayaran Lelang
      </Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.textTitle}>Nama Barang: {barang.namaBarang}</Text>
        <Text style={styles.textSubTitle}>Harga Barang: {barang.hargaSaatIni}</Text>

        {isWinner ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handlePayment}
          >
            <Text style={styles.buttonText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.nonWinnerText}>Anda belum menjadi pemenang.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: themeColors.secondary,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.textSecondary,
    marginBottom: 12,
  },
  textSubTitle: {
    fontSize: 18,
    color: themeColors.textSecondary,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 16,
    backgroundColor: themeColors.button,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.textSecondary,
  },
  nonWinnerText: {
    fontSize: 16,
    color: themeColors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Pembayaran;
