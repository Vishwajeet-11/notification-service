import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function sendSMS(email, message){
    await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: email
    })
    console.log(`SMS sent to ${email}`);
}