'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vegmenuSchema = new Schema({

	today_date: { type: String },
	disclaimer: { type: String },

	meal_type: { type: String, default:'veg'},

	item_one: { type: String },
	description_one: {type: String},

	item_two: { type: String },
	description_two: {type: String},

	item_three: { type: String },
	description_three: {type: String},

	item_four: { type: String },
	description_four: {type: String},

	item_five: { type: String },
	description_five: {type: String},

	item_six: { type: String },
	description_six: {type: String},

	item_seven: { type: String },
	description_seven: {type: String},

	item_eight: { type: String },
	description_eight: {type: String},

	item_nine: { type: String },
	description_nine: {type: String},

	item_ten: { type: String },
	description_ten: {type: String}

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('VegMenu', vegmenuSchema);

