const express = require("express");
const router = express.Router();
const Book = require("../models/orderSchema.js")


//update orders
router.put('/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const updates = req.body;
    
    try {
    const order = await Order.findByIdAndUpdate(isbn, updates, { new: true });
    res.json(order);
    } catch (error) {const router = express.Router();
        res.status(400).json({ message: error.message });
    }
    });

 //active orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Active' }).sort({ createdAt: 'desc' });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
    