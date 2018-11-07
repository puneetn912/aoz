'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calenderSchema = new Schema({
<<<<<<< HEAD
	subscription_id: { type: Schema.Types.ObjectId, ref: 'Subscription'},
	subscriber_name: { type: String},
	selected_data: {type: String, required: true},
	veg_count_on_day: {type: Number, required: true},
	nonVeg_count_on_day: {type: String, required: true},
    month:{type:String},
	user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    apartment_id: { type: Schema.Types.ObjectId, ref: 'Apartment' },
=======
	subscription_id: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true},
    apartment_id: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    user_id:{type: Schema.Types.ObjectId, ref:'User'},

    subscriber_name: { type: String},
    
    selected_data: {type: String, required: true},
    veg_count_on_day: {type: Number, required: true},
    nonVeg_count_on_day: {type: String, required: true},
    month:{type:String},
>>>>>>> 3f0c4686b5bcf863ab039d37270333748d42cbf1
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Calender', calenderSchema);

