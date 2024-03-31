importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBXn027zXNfLZE8_8L4Epvr70rkIhZP6R0",
  authDomain: "chatapp-c1b95.firebaseapp.com",
  projectId: "chatapp-c1b95",
  storageBucket: "chatapp-c1b95.appspot.com",
  messagingSenderId: "229540453106",
  appId: "1:229540453106:web:1fde567fb80942f4b7ce6b",
  measurementId: "G-G35GFNNKGF"
};

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });