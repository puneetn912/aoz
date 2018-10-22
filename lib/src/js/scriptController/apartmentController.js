var Request = require("request");
var mongoose = require('mongoose');
var Apartment = require('../../../models/apartment');

//save single Subscription
exports.getAptByLocality = (req, res, next) => {
    console.log(req.params,'req.params')
    Apartment.find({locality_id:'5bc3417fbe933c3dae55e180'}).exec((err, data)=>{if(err){res.send(err)}
    else{ res.send(data) }})
};
