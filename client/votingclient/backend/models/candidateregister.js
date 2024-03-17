const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  partyName: {
    type: String
  },
  partySymbol: {
    type: String,
    required: true
  },
  candidateName: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  partyImage: {
    data: Buffer,
    contentType: String,
  },

  candidateImage: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = candidateRegister = mongoose.model("candidateRegister", imgSchema);