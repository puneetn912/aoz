'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
	category: { type: String,default:'dinner'},
	user_id: { type: String },
	user_name: { type: String },
	apartment_id: { type: String },
	apartment_name: { type: String },
	meal_type : {type: String },
	veg_count : {type: Number },
	nonveg_count : {type: Number },
	veg_remain : {type: Number },
	nonveg_remain : {type: Number },
	days_count : {type: Number },
	status : {type: Boolean,default:true },
	amount : {type: String },
	start_date : {type: String },
	end_date : {type: String },
	tower_name: {type: String },
	door_no: {type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });
module.exports = mongoose.model('Subscription', subscriptionSchema);

