const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
auction_id:{
  type:String
},
  company:{
    type:String,
    required:true
},
time:{
    type:Date,
    required:true
},
privacy:{
  type:String,
  required:true
},
status:{
  type:String,
},
passcode:{
    type:String,
    
},
particular:{
    type:[String],
    required:true,
},
auctioner:{
type:String,
required:true
},
result:{
  type:Object
}
});

module.exports = registerindex = mongoose.model("registerindex", imgSchema);