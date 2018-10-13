'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
	caterer_id: { type: String, required: true},
	caterer_name: { type: String, required: true},
	meal_type : {type: String,required: true},
	meal_count : {type: Number,required: true},
	start_date : {type: String,required: true},
	end_date : {type: String,required: true},
	user_id: { type: String, required: true},
	user_name: { type: String, required: true},
	apartment_id: { type: String, required: true},
	apartment_name: { type: String, required: true},
	subscription_count : {type: Number,required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });
module.exports = mongoose.model('Subscription', subscriptionSchema);

