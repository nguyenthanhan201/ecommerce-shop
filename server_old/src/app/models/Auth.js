const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Auth = new Scheme(
  {
    email: { type: String, require: true, maxLength: 255, unique: true },
    name: { type: String, require: true, maxLength: 255 },
    refeshToken: { type: String, require: true, maxLength: 255, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", Auth);
