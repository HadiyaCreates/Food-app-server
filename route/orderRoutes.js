// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Mongoose model

// Create Order
router.post("/create", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get Orders by User
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

module.exports = router;
