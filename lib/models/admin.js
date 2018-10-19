/* Code generator by Bharath */
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var adminSchema = new Schema({
	name: { type: String },
	email: { type: String },
	username: { type: String },
	passwordDe: { type: String },
	password:{type:String}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

adminSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
adminSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Admin', adminSchema);