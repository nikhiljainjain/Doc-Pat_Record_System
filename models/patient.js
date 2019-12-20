const mongoose = require('mongoose');
// const _ = require('lodash');
// var {scoreOfDisease, Disease} = require('./diseases.js');
// var rooms = require('./rooms.js');

// User Schema
var PatientSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
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
	}
	// hospitalNumber: {
	// 	type: String,
	// 	required: true,
	// 	unique: true
	// },
	// diseases: {
    //     type: Array,
    //     default: []
    //  },
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
	// }
});
var Patient = mongoose.model('Patient', PatientSchema);
module.exports = {Patient};