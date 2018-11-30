var Request = require("request");
var mongoose = require('mongoose');

const path = require("path");
var pug = require("pug");
var nodemailer = require("../../../../mails/nodemailer.js");
const publicPath = path.resolve(__dirname, "../../../../public/templates/emails/");

var Vegmenu = require('../../../models/vegmenu');
var Nonvegmenu = require('../../../models/nonvegmenu');
var contactLead = require('../../../models/contactLead');
var chefLead = require('../../../models/chefLead');
var enquiry = require('../../../models/enquiry');

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
exports.addEnquiry = (req, res, next) => {
    console.log(req.body,'addChefLead')
    enquiry.create(req.body, function(err,data){ if(err){res.send(err)}else{
        
        // mail to admin
        let admin = {email:'info@djfresh.in', subject:req.body.subject}
        const enqAdminPath = path.join(publicPath, "enqAdmin.pug")
        let html = pug.renderFile(enqAdminPath, {enquiry: req.body})
        nodemailer.sendMail(admin, [html]);
        res.send(data)

    }})    
};

