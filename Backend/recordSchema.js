const mongoose = require("mongoose");

const recordSchema=new mongoose.Schema({
  temprature: {
    type: Number,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  personalInfo: {
    type: String,
    required: false,
  },
  ID:{
    type: Number,
    required: true,
  }
});


module.exports = mongoose.model("record", recordSchema,'Record');