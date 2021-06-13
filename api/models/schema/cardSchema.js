const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  cardNumber: {
    type: String,
    minLength: 16,
    required: [true, "Card Number should be at least 16 characters!"]
  },
  CVV: {
    type: String,
    minLength: 3,
    required: [true, "CVV is required!"]
  },
  cardExpDate: {
    type: String,
    required: [true, "Card Exp Date is required!"]
  },
  cardName: {
    type: String,
    required: [true, "Card Name is required!"]
  },
  cardType: {
    type: String,
    enum: {
      values: ['Master', 'Visa'],
      message: 'Invalid Card Type!'
    }
  },
  Username: {
    type: String,
    required: [true, "Username is required!"]
  }
});

module.exports = CardSchema;
