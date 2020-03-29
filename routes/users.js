var express = require("express");
var router  = express.Router();
var User    = require("../models/users");
var passport= require("passport");
const _ = require('lodash');

var middleware    = require("../middleware");
var {Patient} = require('../models/patient.js');

var isValidDate = require('is-valid-date');

router.use(function(req,res,next){
    res.locals.currentUser=req.user;
    
    next();
});




router.post("/register-doc",function(req, res) {
    var  newuser=new User({username:req.body.username,name:req.body.name,isDoc:true}) ;
    User.register(newuser,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/landing");
        });
    });
});
router.post("/register-pat",function(req, res) {
    var  newuser=new User({username:req.body.username,name:req.body.name,isDoc:false}) ;
    User.register(newuser,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/landing");
        });
    });
});
router.post('/appointment',middleware.IsloggedIn,(req,res)=>{

    
    User.findOne({name:req.body.fname})
    .exec(function(err,pat){
        if(err)
        {
            console.log(err);
            res.status(400).send();
        }else{

                                    

            // console.log(user.patient);
            var sex = req.body.sex;
        if (sex === "male") {
            sex = true;
        } else {
            sex = false;
        }
        var date=req.body.doa;
        var arr= date.split('/')
        date =arr[1]+'/'+arr[0]+'/'+arr[2];
        console.log(date);
            var patient = {
                name: req.body.fname,
                id:req.user._id,
                sex: sex,
                doa: new Date(date),
                dname:req.body.dname,
                time:req.body.time,
                // hospitalNumber: _.toUpper(req.body.hospitalNumber),
                diseases: req.body.disease,
                // lastUpdate: (new Date().getTime()),
                
            };
            pat.appointment.push(patient);
             pat.appointment.sort(function(a, b) {
    var dateA = new Date(a.doa), dateB = new Date(b.doa);
    return dateA - dateB;
});
            pat.save();
            User.findOne({name:req.body.dname}).exec(function(err,user){
                                    if(err)
                                    {
                                        console.log(err);
                                        res.status(400).send();
                                    }else{
                                        
                                        // console.log(user.patient);
                                        var sex = req.body.sex;
                                    if (sex === "male") {
                                        sex = true;
                                    } else {
                                        sex = false;
                                    }
                                        var patient = {
                                            name: req.body.fname,
                                            id:req.user._id,
                                            sex: sex,
                                            doa: date,
                                            time:req.body.time,
                                            // hospitalNumber: _.toUpper(req.body.hospitalNumber),
                                            diseases: req.body.disease,
                                            // lastUpdate: (new Date().getTime()),
                                            
                                        };
                                        // console.log(user);
                                        user.appointment.push(patient);
                                       user.appointment.sort(function(a, b) {
    var dateA = new Date(a.doa), dateB = new Date(b.doa);
    return dateA - dateB;
});
                                        user.save();

                                        
                                    }
                                });
            res.redirect("/landing");
        }
    });
});


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
        if (sex === "Male") {
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
            diseases: req.body.disease,
            lastUpdate: (new Date().getTime()),
            doctor : {
                name:req.user.name,
                id:req.user._id
            }
        });
        User.findOne({_id:req.user._id})
        .exec(function(err,user){
        if(err)
        {
            console.log(err);
            res.status(400).send();
        }else{
            // console.log(user.patient);
            user.patient.push(patient);
            user.save();
        
        }
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

    User.findOne({_id:req.user._id}).populate("patient")
    .exec(function(err,user){
        if(err)
        {
            console.log(err);
            res.status(400).send();
        }else{
            // console.log(user.patient);
            res.render("patient",{patient:user.patient});
        }
    });

    
});
router.get('/appointment',middleware.IsloggedIn,(req,res)=>{

    User.findOne({_id:req.user._id})
    .exec(function(err,user){
        if(err)
        {
            console.log(err);
            res.status(400).send();
        }else{
            // console.log(user.patient);
            res.render("landing",{appointment:user.appointment});
        }
    });
    
    
});
router.get('/delete/:id',(req,res,next)=>{
    Patient.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.redirect("back");
        }else{
            res.redirect("back");
        }
    });
});
router.get('/appointment/delete/:id',(req,res,next)=>{
        User.findById(req.user._id,function(err,user){
            
            if(err)

            {
                res.redirect("back");
            }else{
                
                for(var i=0;i<user.appointment.length;i++){
                    
                    if(user.appointment[i].id==req.params.id){
                        
                        user.appointment.splice(i,1);
                        user.save();
                    }
                }
                res.redirect("back");
            }
        });
    })


module.exports=router;