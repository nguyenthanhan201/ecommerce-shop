const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemProduct = new Schema({
  title: { type: String, require: true, maxLength: 255 },
  price: { type: String, require: true, maxLength: 255 },
  stock: { type: Number, require: true },
  image01: { type: String, require: true, maxLength: 255 },
  image02: { type: String, require: true, maxLength: 255 },
  categorySlug: { type: String, require: true, maxLength: 255 },
  colors: { type: Array, require: true, maxLength: 255 },
  slug: { type: String, slug: "title", unique: true },
  size: { type: Array, require: true, maxLength: 255 },
  description: { type: String, require: true, maxLength: 1500 },
  views: { type: Number, default: 0 },
  discount: { type: Number, default: null },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const ItemOrder = new Schema({
  idAuth: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  product: { type: ItemProduct, require: true },
  price: { type: String, require: true, maxLength: 255 },
  size: { type: String, require: true, maxLength: 255 },
  color: { type: String, require: true, maxLength: 255 },
  quantity: { type: Number, require: true },
});

module.exports = mongoose.model("ItemOrder", ItemOrder);
