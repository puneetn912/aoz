'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localitySchema = new Schema({
	locality: { type: String, required: true},
	pincode: { type: Number,required: true },
	lat: {type: Number, required: true},
	lon: { type: Number, required: true },
	geo: [{ type: Number, required: true }],
	city: { type: String, default: 'bangalore'},
	state: { type: String, default: 'karnataka'},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Locality', localitySchema);

