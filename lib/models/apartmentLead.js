'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentLeadSchema = new Schema({
    apartment_name: { type: String},
    contact_name: { type: String },
    contact_no: { type: String },
    locality: { type: String },
    source:{type:String},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('ApartmentLead', apartmentLeadSchema);

