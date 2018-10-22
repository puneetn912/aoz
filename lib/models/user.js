'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: { type: String },
	email: { type: String },
	mobileno: {type: String, required: true},
	caterer_id: {type: String },
	caterer_name: {type: String },
	apartment_id: {type: String },
	apartment_name: {type: String },
	tower_name: {type: String },
	door_no: {type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('User', userSchema);

