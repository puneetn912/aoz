'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
	caterer_id: { type: String, required: true},
	caterer_name: { type: String, required: true},
	user_id: { type: String, required: true},
	user_name: { type: String, required: true},
	message: {type: String, required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Notification', notificationSchema);

