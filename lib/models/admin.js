'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String },
	mobileno: {type: String, unique: true, required: true },
	password: { type: String },
	// roles: { 
	// 			manager: {type: Boolean },
	// 			sales: {type: Boolean },
	// 			merchant: {type: Boolean },
	// 		 },
	verified: {type: Boolean, default:false},
  adminId: [{ type: Schema.Types.ObjectId, ref: 'Superadmin' }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Admin', adminSchema);

