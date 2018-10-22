var Request = require("request");
var mongoose = require('mongoose');
var Locality = require('../../../models/locality');


//save single Subscription
exports.getAll = (req, res, next) => {
    Locality.find({}).exec((err, data)=>{if(err){res.send(err)}
    else{ res.send(data) }})
};