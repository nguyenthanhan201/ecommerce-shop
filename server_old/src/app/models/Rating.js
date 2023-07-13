const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rating = new Schema(
  {
    idAuth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, default: 0 },
    comment: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", Rating);
