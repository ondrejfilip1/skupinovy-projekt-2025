const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 3, maxlength: 20 },
    // na heslo nedavam length check jelikoz bude zaeschovany (length check je v kontrolerech)
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
