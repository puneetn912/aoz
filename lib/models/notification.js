'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
	caterer_id: {type: Schema.Types.ObjectId, ref: 'Caterer'},
	caterer_name: { type: String },
	user_id: {type: Schema.Types.ObjectId, ref: 'User'},
	user_name: { type: String },
	message: {type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = mongoose.model('Notification', notificationSchema);

