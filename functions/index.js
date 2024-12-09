// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();

// exports.confirmUpdate = functions.https.onRequest(async (req, res) => {
//   const {docId} = req.query;
//   const docRef = admin.firestore().collection("pending_updates").doc(docId);

//   const docSnapshot = await docRef.get();

//   if (docSnapshot.exists) {
//     const data = docSnapshot.data();

//     const userRef = admin.firestore().collection("users").doc(data.userId);

//     await userRef.update({
//       name: data.name,
//       address: data.address,
//       ktp: data.ktp,
//       phone: data.phone,
//       isProfileCompleted: true,
//     });
//     await docRef.delete();

//     res.send("Data Anda telah diperbarui.");
//   } else {
//     res.status(404).send("Dokumen tidak ditemukan.");
//   }
// });
