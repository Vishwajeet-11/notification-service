import Queue from "bull";
import sendEmail from "../services/email.service.js";
import sendPushNotification from "../services/push.service.js";
import sendSMS from "../services/sms.service.js";


const notificationQueue = new Queue("notificationQueue", {
    redis: {host: "127.0.0.1", port : 6379}
})

notificationQueue.process(async (job) => {
    const {type, email, message} = job.data;

    try{
        if(type == "email") await sendEmail(email, message);
        else if(type == "sms") await sendSMS(email, message);
        else if(type == "push") await sendPushNotification(email, message);

        job.progress(100);
        console.log(`Notification sent: ${type}`);
    }
    catch(error){
        console.log(`Notification error: ${error}`);
    }
})

export default notificationQueue