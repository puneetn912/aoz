'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	subscription_id: {type: Schema.Types.ObjectId, ref: 'Subscription'},
	subscriber_name: { type: String },
    veg_count: {type: Number},
    nonveg_count: {type: Number},
	amount: { type: Number },
	payment_date: { type: String },
    status:{type:Boolean, default:false},
    order_no: {type:String},
    meal_type: {type:String}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Payment', userSchema);

