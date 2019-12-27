const express = require('express');
const _ = require('lodash');
var middleware    = require("../middleware");
var passport= require("passport");
var {Patient} = require('../models/patient.js');
const router = express.Router();
router.get("/appointment",middleware.IsloggedIn,function(req,res){
    res.render("landing"); 
});

module.exports = router;