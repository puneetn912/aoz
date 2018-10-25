var express = require('express');
var router = express.Router();

var subscription = require('../../lib/models/subscription');
let subscriptionController = require('../../lib/src/js/scriptController/subscriptionController');
let localityController = require('../../lib/src/js/scriptController/localityController');
let apartmentController = require('../../lib/src/js/scriptController/apartmentController');
let userController = require('../../lib/src/js/scriptController/userController');


var mid = '24324';
var username = '5168160';
var password = 'NBTh6GXx';
var secret = 'KVnqNAjbh8wKE6wM';
var now = new Date();

var locality = require('../../lib/models/locality')

//send otp sign up functionalities
router.post('/sendotp', function(req, res) {
	  let signupotp = Math.floor(1000 + Math.random() * 9000);
      let phone = [];
      phone.push(Number(req.body.mobile));
  	  console.log('req.body',req.body)
  	  console.log('req.body',signupotp)
  	  console.log('req.body',phone)
  	  // res.send(signupotp)
});

//payment integration

router.post('/sendtoairpay', function(req, res, next) {
	console.log('req.body',req.body);
	var md5 = require('md5');
	var sha256 = require('sha256');
	var dateformat = require('dateformat');
    alldata   = req.body.buyerAddress+req.body.amount+req.body.orderid;
    udata = username+':|:'+password;
    privatekey = sha256(secret+'@'+udata);
    aldata = alldata+dateformat(now,'yyyy-mm-dd');
	checksum = md5(aldata+privatekey);
    fdata = req.body;
    let paymentObj = { mid : mid,data: fdata,privatekey : privatekey,checksum:checksum}
    console.log('paymentObj paymentObj',paymentObj)
    res.send(paymentObj);
});

// subcription
router.post('/mealcount',subscriptionController.subscriptionCount)
router.post('/createSubs',subscriptionController.createSubs)
router.post('/updateSubs',subscriptionController.updateSubs)
router.post('/getSub/:id',subscriptionController.getSub)

// locality
router.post('/getAllLocality',localityController.getAll)

// apartment
router.post('/getAptByLocality/:id',apartmentController.getAptByLocality)

// user
router.post('/createUser',userController.createUser)
router.post('/updateUser',userController.updateUser)

module.exports = router;