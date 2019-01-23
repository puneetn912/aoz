var Request = require("request");
var mongoose = require('mongoose');
var Apartment = require('../../../models/apartment');
var ApartmentLead = require('../../../models/apartmentLead');
var User = require('../../../models/user');
var Notice = require('../../../models/notification');

var admin = require("firebase-admin");
var serviceAccount = require("../../../../configs/firebase_admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://djfresh-fbc54.firebaseio.com",
});

var defaultMessaging = admin.messaging();

exports.storeToken = (req, res, next) => {
    //console.log(req.body,'body')
    let query = {_id: req.body._id}
    let set = {ftoken:req.body.token}
    let params = {new:true}
    User.findOneAndUpdate(query, set, params).exec((err,data)=>{if(err){
        console.log(err,'err')
    }else{
        //console.log(data,'data')
        res.send(data)
    }})
}