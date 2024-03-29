'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enquirySchema = new Schema({
    name: { type: String},
    email: { type: String },
    mobileno: { type: String },
    subject: { type: String },
    message: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Enquiry', enquirySchema);
