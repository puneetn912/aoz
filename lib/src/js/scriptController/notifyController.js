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
    console.log(req.body,'body')
    let query = {_id: req.body._id}
    let set = {ftoken:req.body.token}
    let params = {new:true}
    User.findOneAndUpdate(query, set, params).exec((err,data)=>{if(err){console.log(err,'err')}else{
        console.log(data,'data')
        res.send(data)
    }})
}

//save single Subscription
exports.notify = (req, res, next) => {
    var topic = 'highScores';

    var message = {
      data: {
        score: '850',
        time: '2:45'
      },
      topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    defaultMessaging.send(message).then((response) => {
        console.log('Successfully sent message:', response);
    }).catch((error) => {
        console.log('Error sending message:', error);
    });

    
};


exports.notifyOne = (req, res, next) => {
    // This registration token comes from the client FCM SDKs.
    var registrationToken = 'YOUR_REGISTRATION_TOKEN';

    // See documentation on defining a message payload.
    var message = {
        notification: {
            title: '$GOOG abv',
            body: '$GOOG asdfasdf'
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message).then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
}

exports.notifyAll = (req, res, next) => {
    // These registration tokens come from the client FCM SDKs.
    var registrationTokens = [
      'bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...',
      // ...
      'ecupwIfBy1w:APA91bFtuMY7MktgxA3Au_Qx7cKqnf...'
    ];

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
      notification: {
        title: 'asdfasdfa',
        body: 'safdasdfu SJKDFNASDFIUH'
      }
    };

    // Send a message to the devices corresponding to the provided
    // registration tokens.
    defaultMessaging().sendToDevice(registrationTokens, payload)
      .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log('Successfully sent message:', response);
      })
      .catch(function(error) {
        console.log('Error sending message:', error);
      });
}


exports.getScheduleNotice = (req, res, next) =>{
    // get date ,type and ftoken from body
    // if(type == scheduleOne) then
        // check db with date in type - schedule one and ftoken matching 
        // if found return
    // else
        // check db with date and in type - schedule all
        // if found return

    console.log(req.body,body)
    let body = req.body
    let query = ''
    let date = new Date(body.date)
    if(body.type == 'scheduleOne'){
        query = {type:body.type, date:date, ftoken:body.ftoken}
    }else{
        query = {type:body.type, date:body.date}
    }
    Notice.find(query).exec((err,data)=>{if(err || data.length==0){console.log(err);res.sendStatus(403)}else{
        console.log(data, 'notice')
        res.sendStatus(data)   
    }})
}