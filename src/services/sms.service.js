import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function sendSMS(phone, message){
    const user_data = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: phone
    })
    console.log(`SMS sent to ${phone}`);
    console.log("user_data: ", user_data)
}