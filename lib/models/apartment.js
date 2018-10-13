'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
	locality_id: { type: String },
	locality: { type: String },
	caterer_id: { type: String },
	apartment_name : {type: String,required: true},
	tower_name: { type: String, required: true},
	address:{
		apartment_name : {type: String,required: true},
		tower_name: { type: String, required: true},
		door_number:{type:String,required: true},
		address_lineone : {type: String,required: true},
		address_linetwo : {type: String},
		pincode : {type: Number},
		locality : {type: String},
		lat : {type: Number},
		lon : {type: Number},
		geo:[{type:Number}],
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Apartment', apartmentSchema);

