const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: { type: Number, required: true },
    userId: { type: String, required: true },
    isbn: { type: String, required: true },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: "active" }
  });
  
  module.exports = mongoose.model("Orders", orderSchema);
