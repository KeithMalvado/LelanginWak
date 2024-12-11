require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const firebaseAdmin = require('firebase-admin');

const app = express();
const port = 8082;

app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  console.log('Order ID:', orderId);
  console.error("Stripe secret key is missing. Make sure the .env file is configured correctly.");
  process.exit(1);  // Exit the process if API key is missing
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).send("Order ID is required");
    }

    // Perbaiki path untuk mengambil data barang
    const productRef = firebaseAdmin.database().ref(`barang/${orderId}`);
    const snapshot = await productRef.once('value');
    const product = snapshot.val();

    // Cek apakah barang ditemukan dan harga tertinggi tersedia
    if (!product || !product.hargaSaatIni) {
      return res.status(400).send("Product price not available or product not found");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.hargaSaatIni * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { orderId: orderId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
