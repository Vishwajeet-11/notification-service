import { producer } from "../kafka.js";
import Notification from "../models/notification.model.js";

export const sendNotification = async (req, res) => {
    try{
        
        console.log("🔹 Request received:", req.body);

        const {email, type, message} = req.body;
        
        const notification = await Notification.create({email, type, message});

        await notificationQueue.add(notification.toObject());

        res.status(200).json({success: true, message: "Notification queued! "});
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const createNotification = async (req, res) => {
    try {
        console.log("🔹 Request received:", req.body);

        const { email, phone, type, message } = req.body;

        if (!type || !message) {
            console.log("🔸 Missing fields in request");
            return res.status(400).json({ error: "Type and message are required" });
        }

        // Save the notification in the database
        const notification = new Notification({ email, type, message });
        await notification.save();
        console.log("✅ Notification saved successfully:", notification);

        // Publish to Kafka instead of sending directly
        await producer.connect();
        await producer.send({
            topic: 'notifications',
            messages: [{
                valu: JSON.stringify({
                    type,
                    email,
                    phone,
                    message
                })
            }]
        });
        console.log("📤 Notification event published to Kafka");

        res.status(201).json({ 
            success: true, 
            message: "Notification queued for processing",
            data: notification 
        });
    } catch (error) {
        console.error("❌ Notification Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

