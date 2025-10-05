import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

// // Initialize the Firebase app in the service worker by passing the generated config
// Note: Service workers cannot directly access process.env variables
// These values should be replaced with actual values from environment variables during build time
// or passed through a configuration mechanism
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// firebase?.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = getMessaging(app);

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
