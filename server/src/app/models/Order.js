const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  idAuth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  idProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  size: { type: String, require: true, maxLength: 255 },
  color: { type: String, require: true, maxLength: 255 },
  quantity: { type: Number, require: true },
});

module.exports = mongoose.model("Order", Order);
