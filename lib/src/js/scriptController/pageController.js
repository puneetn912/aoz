var Request = require("request");
var mongoose = require('mongoose');
var Vegmenu = require('../../../models/vegmenu');
var Nonvegmenu = require('../../../models/nonvegmenu');
var contactLead = require('../../../models/contactLead');
var chefLead = require('../../../models/chefLead');

exports.addContactLead = (req, res, next) => {
    console.log(req.body,'addContactLead')
    contactLead.create(req.body, function(err,data){ if(err){res.send(err)}else{
        res.send(data)
    }})    
};
exports.addChefLead = (req, res, next) => {
    console.log(req.body,'addChefLead')
    chefLead.create(req.body, function(err,data){ if(err){res.send(err)}else{
        res.send(data)
    }})    
};

