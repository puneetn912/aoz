'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calenderSchema = new Schema({
	subscription_id: { type: Schema.Types.ObjectId, ref: 'Subscription'},
	subscriber_name: { type: String},
	selected_data: {type: String, required: true},
	veg_count_on_day: {type: Number},
	nonVeg_count_on_day: {type: String},
    month:{type:String},
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    apartment_id: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    caterer_veg_id:{type:Schema.Types.ObjectId, ref:'Caterer'},
    caterer_nonveg_id:{type:Schema.Types.ObjectId, ref:'Caterer'},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Calender', calenderSchema);

