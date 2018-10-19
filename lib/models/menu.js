'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
	today_date: { type: String, required: true},
	veg_menu: { type: String },
	nonVeg_menu: {type: String},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Menu', menuSchema);

