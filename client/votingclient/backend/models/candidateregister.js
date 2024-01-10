const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
partyname:{
  type:String
},
  partysymbol:{
    type:String,
    required:true
},
candidatename:{
   type:String
  },
  address:{
         type:String,
         required:true
    },
    partyimg: {
      data: Buffer,
      contentType: String,
    },
 
  profileimg: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = candidateregister = mongoose.model("candidateregister", imgSchema);