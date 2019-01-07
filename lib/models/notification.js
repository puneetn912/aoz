'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
	caterer_id: {type: Schema.Types.ObjectId, ref: 'Caterer'},
	user_id: [{type: Schema.Types.ObjectId, ref: 'User'}],
    ftoken: [{type: String}],
    title: {type:String},
	message: {type: String },
    date: {type:String},
    time: {type:String},
    type:{type:String}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Notification', notificationSchema);

