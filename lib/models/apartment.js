'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
	// locality_id: { type: Schema.Types.ObjectId, ref: 'Locality' },
	// locality: { type: String },
	// pincode: { type: Number },
	caterer_veg_id: { type: Schema.Types.ObjectId, ref: 'Caterer'},
	caterer_veg_name: { type: String },
	caterer_nonveg_id: { type: Schema.Types.ObjectId, ref: 'Caterer' },
	caterer_nonveg_name: { type: String },
	apartment_name : {type: String },
	tower_names : [{type: String }],
	address:{
		apartment_name : {type: String},
		tower_names : [{type: String }],
		address_lineone : {type: String },
		address_linetwo : {type: String},
		pincode : {type: Number},
		// locality : {type: String},
		// lat : {type: Number},
		// lon : {type: Number},
		// geo:[{type:Number}],
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Apartment', apartmentSchema);

