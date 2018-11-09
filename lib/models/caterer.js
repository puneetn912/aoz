'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catererSchema = new Schema({
	caterer_name: { type: String, required: true},
	name: { type: String, required: true},
	email: { type: String },
	mobileno: {type: String, required: true},
	// locality_id : { type: Schema.Types.ObjectId, ref: 'Locality'},
	// locality : {type: String},
	meal_type : {type: String},
	// authMobile : {type: String},
	// pincode:{type: Number},
	address:{
		post_boxno : {type: String},
		buliding_name : {type: String},
		address_lineone : {type: String,},
		address_linetwo : {type: String},
		pincode : {type: Number},
		// locality : {type: String},
		// lat : {type: Number},
		// lon : {type: Number},
		// geo:[{type:Number}],
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });


module.exports = mongoose.model('Caterer', catererSchema);

