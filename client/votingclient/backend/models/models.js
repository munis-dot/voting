const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({

  Businessname:{
    type:String,
    required:true
},
Owner:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
number:{
    type:String,
    required:true
},
landline:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
url:{
    type:String,
    required:true
},
hours:{
    type:String,
    required:true
},
hours2:{
    type:String,
    required:true
},
workdays:{
    type:String,
    required:true
},
about:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
sub_category:{
    type:String,
    required:true
},

  keyword: [String],
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);