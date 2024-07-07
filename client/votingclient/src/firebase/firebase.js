import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getMessaging, getToken, onMessage} from "firebase/messaging";


//notifications
const firebaseConfig = {
    apiKey: "AIzaSyBXn027zXNfLZE8_8L4Epvr70rkIhZP6R0",
    authDomain: "chatapp-c1b95.firebaseapp.com",
    projectId: "chatapp-c1b95",
    storageBucket: "chatapp-c1b95.appspot.com",
    messagingSenderId: "229540453106",
    appId: "1:229540453106:web:1fde567fb80942f4b7ce6b",
    measurementId: "G-G35GFNNKGF"
  };

  firebase.initializeApp(firebaseConfig)

  const messaging = getMessaging();

  export const requestForToken = async () => {

    try {
          const currentToken = await getToken(messaging, { vapidKey: "BLe3MvfX3I0YtAlkb7QUzbKDRTg5Y79wDGii24v9tHomzclVPFNkh30wMxb1Iklr9r-xJr0dxkvdunTFCn7Ay7U"});
          if (currentToken) {
              console.log('Current token for client: ', currentToken);
              return currentToken;
          }
          else {
              console.log('No registration token available. Request permission to generate one');
          }
      } catch (err) {
          console.log("ERROR", err);
      }
      
  }

  export const onMessageListener = () => new Promise((resolve) => {
    onMessage(messaging, (payload) => {
        console.log("payload", payload)
        resolve(payload);
    });
  })