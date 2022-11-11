const { number } = require("joi");
const mongoose = require("mongoose");

const recordSchema=require("./recordSchema");
autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);
const patientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  username:{
    type: String,
    required: true,
    
  },
  age:{
    type: Number,
  },
  gender:{
    type:String,
  },
  password: {
    type: String,
    required: true,
  },
  ID: {
    type: String,
    unique: false,
    required: true,
  
  }
});
patientSchema.plugin(autoIncrement.plugin, {
  model: "patient",
  field: "ID",
  startAt: 1,
});
module.exports = mongoose.model("patient", patientSchema,'Patients');

