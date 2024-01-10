const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
address:{
  type:String
},
  dateandtime:{
    type:Date,
  
},
alreadyvoted:{
    type:Boolean,
    required:true
},
location:{
  type:{ type: {type:String}, coordinates: [Number]}
}
});

module.exports = ImageModel = mongoose.model("voters", imgSchema);