const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const Product = new Scheme(
  {
    title: { type: String, require: true, maxLength: 255 },
    price: { type: String, require: true, maxLength: 255 },
    image01: { type: String, require: true, maxLength: 255 },
    image02: { type: String, require: true, maxLength: 255 },
    categorySlug: { type: String, require: true, maxLength: 255 },
    colors: { type: Array, require: true, maxLength: 255 },
    slug: { type: String, slug: "title", unique: true },
    size: { type: Array, require: true, maxLength: 255 },
    description: { type: String, require: true, maxLength: 255 },
    views: { type: Number, default: 0 },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
