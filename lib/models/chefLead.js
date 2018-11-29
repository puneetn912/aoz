'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chefLeadSchema = new Schema({
    chefName: { type: String},
    email: { type: String },
    mobileno: { type: String },
    subject: { type: String },
    message: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('ChefLead', chefLeadSchema);
