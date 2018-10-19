'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
	category: { type: String, required: true,default:'dinner'},
	user_id: { type: String, required: true},
	user_name: { type: String, required: true},
	apartment_id: { type: String, required: true},
	apartment_name: { type: String, required: true},
	meal_type : {type: String,required: true},
	veg_count : {type: Number,required: true},
	nonveg_count : {type: Number,required: true},
	veg_remain : {type: Number },
	nonveg_remain : {type: Number },
	days_count : {type: Number },
	status : {type: Boolean,default:true },
	amount : {type: String,required: true},
	start_date : {type: String,required: true},
	end_date : {type: String,required: true},
	tower_name: {type: String, required: true},
	door_no: {type: String, required: true},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });
module.exports = mongoose.model('Subscription', subscriptionSchema);

