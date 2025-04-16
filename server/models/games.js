const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Game", schema);
