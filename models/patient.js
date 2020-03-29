const mongoose = require('mongoose');
var passportLocalMongoose   =     require("passport-local-mongoose");

// const _ = require('lodash');
// var {scoreOfDisease, Disease} = require('./diseases.js');
// var rooms = require('./rooms.js');

// User Schema
var PatientSchema = mongoose.Schema({
	username:String,
    password:String,
	pat_name:String,
	lastName: {
		type: String,
		required: true 
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	sex: {
		// true = male
		// false = female
		type: Boolean,
		required: true,
		default: true
	},
	dname:String,
	// hospitalNumber: {
	// 	type: String,
	// 	required: true,
	// 	unique: true
	// },
	diseases: {
        type: String,
        default: ""
     },
    //  score: {
    //     type: Number,
	//    required: true,
	//    default: 0
    //  },
	// room: {
	// 	type: String,
	// 	required: true,
	// 	default: 'noroom'
	// },
	// lastUpdate: {
	// 	type: Number,
	// 	required: true
	// },
	appointment:[],
	doctor:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
		},
		user:String,
		// H_id:Number
		
    }
});
var Patient = mongoose.model('Patient', PatientSchema);
PatientSchema.plugin(passportLocalMongoose);

module.exports = {Patient};