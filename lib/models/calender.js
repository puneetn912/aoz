'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calenderSchema = new Schema({
	subscription_id: { type: String, required: true},
	subscriber_name: { type: String,required: true},
	selected_data: {type: String, required: true},
	veg_count_on_day: {type: Number, required: true},
	nonVeg_count_on_day: {type: String, required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Calender', calenderSchema);
