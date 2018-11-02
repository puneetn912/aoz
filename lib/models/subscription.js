'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    apartment_id: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    status : {type: Boolean,default:false },
    account_status: {type:Boolean,default:true},
    
    user_name: { type: String },
	category: { type: String,default:'dinner'},
    meal_type : {type: String },
    
    apartment_name: { type: String },
    tower_name: {type: String },
    door_no: {type: String },
    
    veg_count : {type: Number },
    nonveg_count : {type: Number },
    veg_remain : {type: Number },
    nonveg_remain : {type: Number },
    days_count : {type: Number },
    amount : {type: Number },
    totalVegCount:{ type: Number },
    totalNvegCount:{ type:Number },
    
    start_date : {type: Date },
    end_date : {type: Date },
    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });
module.exports = mongoose.model('Subscription', subscriptionSchema);

