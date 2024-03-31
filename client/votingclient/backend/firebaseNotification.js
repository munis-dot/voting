// Import required modules
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('./chatapp-c1b95-firebase-adminsdk-zwfjy-e728937ec2.json'); // Update with your service account key file path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Function to send a notification to a device
async function sendNotification(registrationToken, notification) {
  try {
    const response = await admin.messaging().sendEachForMulticast({
      tokens: registrationToken,
      notification: {
        title: notification.title,
        body: notification.body
      }
    });
    console.log('Notification sent:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Main function to send a notification
async function firebaseNotification(registrationToken,winner) {
    console.log(registrationToken,winner)
    const notification = {
      title: 'W3 VOTING WINNER',
      body: winner
    };
    
    // Send notification
    await sendNotification(registrationToken, notification);
  }
  
  module.exports= {firebaseNotification}
