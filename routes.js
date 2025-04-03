import express from "express";
import { createNotification } from "./src/controllers/notification.controller.js";

const router = express.Router();

router.post("/send-notification", createNotification);

export default router;