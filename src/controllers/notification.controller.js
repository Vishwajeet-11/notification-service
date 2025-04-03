import Notification from "../models/notification.model.js";
import notificationQueue from "../queues/notification.queue.js";
import sendEmail from "../services/email.service.js";

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

        const { email, type, message } = req.body;

        if (!email || !type || !message) {
            console.log("🔸 Missing fields in request");
            return res.status(400).json({ error: "Email, type, and message are required" });
        }

        // Save the notification in the database
        const notification = new Notification({ email, type, message });
        await notification.save();
        console.log("✅ Notification saved successfully:", notification);

        // **Trigger Email Notification**
        if (type === "email") {
            console.log(`📧 Sending email to: ${email}`);
            await sendEmail(email, "Notification Alert", message);
            console.log("✅ Email sent successfully");
        }

        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        console.error("❌ Notification Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

