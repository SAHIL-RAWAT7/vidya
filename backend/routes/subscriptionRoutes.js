import express from "express";
import { subscribeUser } from "../controllers/subscriptionController.js";

const router = express.Router();

// @route   POST /api/subscribe
router.post("/", subscribeUser);

export default router;
