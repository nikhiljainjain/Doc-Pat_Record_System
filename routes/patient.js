const express = require('express');
const _ = require('lodash');
var middleware    = require("../middleware");
const router = express.Router();
var {Patient} = require('../models/patient.js');
// var {rooms, Room} = require('./../server/models/rooms.js');
var isValidDate = require('is-valid-date');
// const {ObjectID} = require('mongodb');
router.post('/addpatient', middleware.IsloggedIn,(req, res) => {
    // receive the diseases from the form in the array PD, each element being a String with the disease name
    // var PD = req.body.PD;
    var dateOfBirth = req.body.dateOfBirth;

    // console.log(dateOfBirth);
    // console.log(isValidDate(dateOfBirth));

    // if (_.isEmpty(PD)) {    // check if no disease is selected
    //     PD = [];
    // }

    // Check for empty fields
    console.log(req.body.fname+req.body.lname+req.body.bday);
    if (_.isEmpty(req.body.fname) || _.isEmpty(req.body.lname)  ) {
        // if (_.isEmpty(req.body.firstName)) req.flash('error_msg', 'Please enter the first name.');
        // if (_.isEmpty(req.body.lastName)) req.flash('error_msg', 'Please enter the last name.');
        // if (_.isEmpty(req.body.hospitalNumber)) req.flash('error_msg', 'Please enter the hospital number.');
        // if (!isValidDate(dateOfBirth)) req.flash('error_msg', 'The date is not valid.');
        // console.log("abc");
        res.status(400).redirect('/addpatient');
    } else {
        // set the sex of the new patient
        var sex = req.body.sex;
        if (sex === "male") {
            sex = true;
        } else {
            sex = false;
        }

        // make a new patient and add it in the database
        var patient = Patient({
            firstName: req.body.fname,
            lastName: req.body.lname,
            sex: sex,
            dateOfBirth: req.body.bday,
            // hospitalNumber: _.toUpper(req.body.hospitalNumber),
            // diseases: PD,
            lastUpdate: (new Date().getTime())
        });

        patient.save().then((patient) => {
            // patient.updateScore();
            res.status(200).redirect('/users/landing');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/users/landing');
        });
   }
});
router.get('/viewpatient',middleware.IsloggedIn,(req,res)=>{
    
    Patient.find({}).then((patients) => {
        console.log(patients);
        res.render("patient",{patient:patients});
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});
module.exports = router;