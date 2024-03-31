const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required:true
  },
});

module.exports = tokenRegistration = mongoose.model("tokenRegistration", tokenSchema);