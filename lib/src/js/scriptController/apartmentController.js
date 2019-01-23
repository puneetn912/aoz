var Request = require("request");
var mongoose = require('mongoose');
var Apartment = require('../../../models/apartment');
var ApartmentLead = require('../../../models/apartmentLead');

const path = require("path");
var pug = require("pug");
var nodemailer = require("../../../../mails/nodemailer.js");
const publicPath = path.resolve(__dirname, "../../../../public/templates/emails/");


//save single Subscription
exports.getAptByLocality = (req, res, next) => {
    //console.log(req.params,'req.params')
    let query = {locality_id:req.params.id}
    Apartment.find(query).exec((err, data)=>{if(err){res.send(err)}else{ 
        res.send(data) 
    }})
};
exports.getAptById = (req, res, next) => {
    //console.log(req.params,'req.params')
    let query = {_id:req.params.id}
    Apartment.find(query).exec((err, data)=>{if(err){res.send(err)}else{ 
        res.send(data) 
    }})
};

exports.getAll = (req, res, next) => {
    Apartment.find({}).exec((err, data)=>{if(err){res.send(err)}
    else{ res.send(data) }})
};

exports.update = (req, res, next) => {
    // Apartment.findOne({ _id: req.params.id}).exec((err, apartment) => { if (!err) {
    //     apartment.locality_id = req.body.locality_id  ? req.body.locality_id : apartment.locality_id;
    //     apartment.locality = req.body.locality  ? req.body.locality : apartment.locality;
    //     apartment.caterer_id = req.body.caterer_id  ? req.body.caterer_id : apartment.caterer_id;
    //     apartment.caterer_name = req.body.caterer_name  ? req.body.caterer_name : apartment.caterer_name;
    //     apartment.apartment_name = req.body.apartment_name  ? req.body.apartment_name : apartment.apartment_name;
    //     apartment.tower_names = req.body.tower_names  ? req.body.tower_names : apartment.tower_names;
    //     apartment.address = {
    //         apartment_name: req.body.apartment_name ? req.body.apartment_name : apartment.apartment_name,
    //         tower_names: req.body.tower_names ? req.body.tower_names : apartment.tower_names,
    //         address_lineone: req.body.address_lineone ? req.body.address_lineone : apartment.address_lineone,
    //         address_linetwo: req.body.address_linetwo ? req.body.address_linetwo :  apartment.address_linetwo,
    //         pincode: req.body.pincode ? req.body.pincode :  apartment.pincode,
    //         locality: req.body.locality ? req.body.locality : apartment.locality,
    //         lat: req.body.lat ? req.body.lat : apartment.lat,
    //         lon: req.body.lon ? req.body.lon : apartment.lon,
    //         geo: req.body.lat &&  req.body.lon? [req.body.lat,req.body.lon] : apartment.geo,
    //     };
    //     apartment.save((err, ApartmentUpdate) => { if (!err) { res.send(ApartmentUpdate); 
    //     } else { res.send(err) }});
    // } else { res.send(err)
    //   };
};

exports.addTwr = (req, res, next) => {
    //console.log(req.params.id, req.body,'req.params.id')
    let query = {_id: req.params.id }
    let push = { $push: { tower_names: req.body.tower }}
    Apartment.update(query , push , {new:true}).exec((err,data)=>{if(err){res.send(err)
    }else{ res.send(data) }})
}

exports.addApt = (req, res, next) => {
    ApartmentLead.create(req.body, function(err,data){ if(err){res.send(err)}else{
        //console.log(data, 'data')
        // send mail
        let admin = {email: 'djfresh@ritsworld.com', subject:'New Apartment Registeration'}
        //console.log(admin,'admin');
        const apartPath = path.join(publicPath,'apartmentMail.pug')
        let html = pug.renderFile(apartPath,{enquiry:req.body})
        nodemailer.sendMail(admin,[html]);
        res.send(data)
    }})
}
