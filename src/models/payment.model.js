const mongoose = require("mongoose");

const paymentShema = new mongoose.Schema(
  {
    sendData: {
      type: Object,
      required: true,
      trim: true,
    },
    resultData: {
      type: Object,
      required: true,
      trim: true,
    },
  },
  { collection: "payment", timestamps: true }
);

const payment = mongoose.model("payments", paymentShema);

module.exports = payment;
