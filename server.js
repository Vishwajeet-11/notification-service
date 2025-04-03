import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes.js";


dotenv.config();

const app = express();
// console.log("EMAIL_USER from env:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS from env:", process.env.EMAIL_PASS ? "********" : "Not Set");


app.use(express.json());
app.use("/api", routes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MONGODB CONNECTED")
})

app.listen(3000, () =>{
    console.log("Server running on port 3000")
})