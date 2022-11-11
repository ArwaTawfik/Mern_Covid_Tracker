var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var patientModel = require('./patientSchema');
var recordModel =require("./recordSchema");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Connecting to database

var query ="mongodb+srv://arwa:arwa654321@cluster0.ksr6a.mongodb.net/nodogoro?retryWrites=true&w=majority";

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const { response } = require("express");s
// const { checkPreferences } = require("joi");


const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
	if (error) {
		console.log("Error!" + error);
	}
});


  router.route("/addPatient").post(async (req, res) => {
    const patient = req.body;
    console.log(patient)
    const patientSchema = Joi.object({
        email: Joi.string(),
        username:Joi.string(),
        password:Joi.string(),
        age:Joi.number(),
        gender:Joi.string(),
      
    });
    try {
      const value = await patientSchema.validateAsync(patient);
    } catch (err) {
      console.log(err.message);
      return res.status(403).json(err.message);
    }
    console.log(patient);
    if (
      patient.email == null ||
      patient.username == null ||
      patient.password == null 
     
    )
      return res.status(400).json("Missing Attributes");
    
      let found = await patientModel.findOne({
      email: patient.email});
    
    if (found) {
      return res.status(400).json("Email Already Registered");
    }

    console.log(patient);

    const salt = await bcrypt.genSalt(10);
    const newpass = await bcrypt.hash(req.body.password, salt);
    patient.password=newpass;
    console.log(patient.password);

    let result = await patientModel(patient).save();

    console.log(result);
    if (result) {
      return res.status(200).json("Added Successfully");
    } else {
      return res.status(400).json("User not elligible");
    }
  });
  router.route("/updatePatient").post(async (req, res) => {
    

    const patientReturned=await patientModel.findOneAndUpdate({ email: req.body.email},req.body)
    console.log(patientReturned)
    if (patientReturned) {
      return res.status(200).json(patientReturned);
    } else return res.status(404).json("location not found");
});


router.route("/addRecord").post(async (req, res) => {
  try{
    var record=await recordModel(req.body).save()
   if (record) {
      return res.status(200).json(record);
    } else return res.status(404).json("record has problems");
  }
  catch (err) {
    return res.status(403).json(err.message);
  }

});

router.route("/getRecords").get(async (req, res) => {
  var record=await recordModel.find();
 if (record) {
    return res.status(200).json(record);
  } else return res.status(404).json("record has problems");

});

router.route("/getPatient").post(async (req, res) => {
  try{
    var patient=await patientModel.findOne({ email: req.body.email})
    console.log(patient)
    const correctpass = await bcrypt.compare(
      req.body.password,
      patient.password
    );
    console.log(correctpass);

    if (patient) {
      if( correctpass)
       return res.status(200).json(patient);
      else
      return res.status(404).json("Wrong Password");
    } else return res.status(404).json("patient not found");
  }
  catch (err) {
    return res.status(403).json(err.message);
  }

});

router.route("/getPatient").get(async (req, res) => {
  try{
  console.log(req.headers.token)
  
  var patient=await patientModel.findOne({ email: req.headers.token})

  if (patient) {
     return res.status(200).json(patient);
   
  } else return res.status(404).json("patient not found");
}catch (err) {
  return res.status(403).json(err.message);
}
});
module.exports = router;
