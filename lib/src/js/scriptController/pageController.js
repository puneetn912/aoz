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
var feedback = require('../../../models/feedback');

exports.addContactLead = (req, res, next) => {
    //console.log(req.body,'addContactLead')
    contactLead.create(req.body, function(err,data){ if(err){res.send(err)}else{
        // send email
        let admin = {email:'djfresh@ritsworld.com', subject:req.body.subject}
        //console.log(admin,'admin')
        const enqAdminPath = path.join(publicPath, "contactMail.pug")
        let html = pug.renderFile(enqAdminPath, {enquiry: req.body})
        nodemailer.sendMail(admin, [html]);
        res.send(data)
    }})    
};
exports.addChefLead = (req, res, next) => {
    //console.log(req.body,'addChefLead')
    chefLead.create(req.body, function(err,data){ if(err){res.send(err)}else{
        // send mail
        let admin = {email: 'djfresh@ritsworld.com', subject:req.body.subject}
        //console.log(admin,'admin');
        const enqAdminPath = path.join(publicPath,'chefMail.pug')
        let html = pug.renderFile(enqAdminPath,{enquiry:req.body})
        nodemailer.sendMail(admin,[html]);
        res.send(data)
    }})    
};

// djfresh@ritsworld.com
// info@djfresh.in

exports.addFeedback = (req, res, next) => {
    let date = new Date().toISOString().slice(0,10)
    //console.log(date,'date')
    req.body.date = date
    //console.log(req.body,'addFeedback')

    let query = {user_id : req.body.user_id, date: date.toString()}
    //console.log(query, 'query')
    feedback.findOne(query).exec((err,feedData)=>{if(err || feedData){res.sendStatus(403)}else{
        feedback.create(req.body, function(err,data){ if(err){res.send(err)}else{
            //console.log(data,'data')
            // save with date and userid
            // check if user id and date exist, if yes then return error
            // or save 
            
            // send mail
            let admin = {email: 'djfresh@ritsworld.com', subject:req.body.subject}
            //console.log(admin,'admin');
            const enqAdminPath = path.join(publicPath,'feedbackMail.pug')
            let html = pug.renderFile(enqAdminPath,{enquiry:req.body})
            nodemailer.sendMail(admin,[html]);
            res.send(data)
        }})
    }})
};

exports.addEnquiry = (req, res, next) => {
    //console.log(req.body,'addEnenquiry')
    enquiry.create(req.body, function(err,data){ if(err){res.send(err)}else{
        
        // mail to admin
        let admin = {email:'djfresh@ritsworld.com', subject:req.body.subject}
        const enqAdminPath = path.join(publicPath, "enquiryMail.pug")
        let html = pug.renderFile(enqAdminPath, {enquiry: req.body})
        nodemailer.sendMail(admin, [html]);
        res.send(data)

    }})    
};



