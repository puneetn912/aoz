'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String,required: true},
	mobileno: {type: String, required: true},
	caterer_id: {type: String, required: true},
	caterer_name: {type: String, required: true},
	apartment_id: {type: String, required: true},
	apartment_name: {type: String, required: true},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('User', userSchema);

