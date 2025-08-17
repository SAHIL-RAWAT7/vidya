import Subscription from "../models/Subscription.js";

// Add new subscription
export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const newSub = new Subscription({ email });
    await newSub.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
