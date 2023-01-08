const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    idAuth: { type: String, require: true },
    order: { type: Object, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
