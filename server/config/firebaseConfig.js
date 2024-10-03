const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceFile = require("../cred.json");

initializeApp({
  credential: cert(serviceFile),
});

const firebaseDB = getFirestore();

module.exports = { firebaseDB };
