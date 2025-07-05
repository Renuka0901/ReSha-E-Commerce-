const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      image: String,
    },
  ],
  user: String,
  email: String,
  amount: Number,
  status: String,
  date: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
