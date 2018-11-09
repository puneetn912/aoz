'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: { type: String },
	email: { type: String },
	mobileno: {type: String, required: true},
	caterer_veg_id: { type: Schema.Types.ObjectId, ref: 'Caterer'},
	caterer_veg_name: { type: String },
	caterer_nonveg_id: { type: Schema.Types.ObjectId, ref: 'Caterer' },
	caterer_nonveg_name: { type: String },
	apartment_id: { type: Schema.Types.ObjectId, ref: 'Apartment' },
	apartment_name: {type: String },
	tower_name: {type: String },
	door_no: {type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('User', userSchema);

