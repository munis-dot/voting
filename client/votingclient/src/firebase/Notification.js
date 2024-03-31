import React, { useState, useEffect } from 'react';
import { requestForToken, onMessageListener } from './firebase';
import axios from 'axios';

const Notification = () => {

  const [notification, setNotification] = useState({ title: '', body: '' });

  const notify = () => alert(`${notification?.title}`, `${notification?.body}`);

  useEffect(() => {
    if (notification?.title) {
      //call api
      notify()
    }
  }, [notification])

  useEffect(() => {
    getTokenValue();
  }, [])



  const create = ((userToken) => {
    console.log("first")
    const url = `http://localhost:8000/userRegistration`;
    axios.post(url, userToken)
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err))
  })

  const getTokenValue = async () => {
    const token = await requestForToken();
    console.log(token)
    if (token) {

      if (localStorage.getItem('fbToken')) {

        if (token !== localStorage.getItem('fbToken')) {
          // call api
          // restService
          create({ registrationToken: token });
          localStorage.setItem("fbToken", token)
        }
      }
      else {

        // call api
        create({ registrationToken: token });
        localStorage.setItem("fbToken", token);
      }
    }
  };

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

}



export default Notification