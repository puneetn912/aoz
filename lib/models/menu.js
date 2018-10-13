'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
	caterer_id: { type: String, required: true},
	caterer_name: { type: String, required: true},
	item_name: { type: String, required: true},
	description: { type: String },
	quantity: {type: Number, required: true},
	date: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Menu', menuSchema);

