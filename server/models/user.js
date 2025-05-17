const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
