'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	subscription_id: { type: String,required:true},
	subscriber_name: { type: String },
	amount: { type: String },
	payment_date: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Payment', userSchema);

