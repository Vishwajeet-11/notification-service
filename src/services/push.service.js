import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

export default async function sendPushNotification(email, message){
    await admin.messaging().send({
        notification: {title: "Notification", body: message}
    })
    console.log(`Push Notification sent to ${email}`);
}