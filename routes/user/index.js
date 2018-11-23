var express = require('express');
var request = require('request')
var router = express.Router();

var subscription = require('../../lib/models/subscription');
let subscriptionController = require('../../lib/src/js/scriptController/subscriptionController');
let localityController = require('../../lib/src/js/scriptController/localityController');
let apartmentController = require('../../lib/src/js/scriptController/apartmentController');
let userController = require('../../lib/src/js/scriptController/userController');
let calendarController = require('../../lib/src/js/scriptController/calendarController');
let paymentController = require('../../lib/src/js/scriptController/paymentController');
let menuController = require('../../lib/src/js/scriptController/menuController');


var mid = '26239';
var username = '5895556';
var password = 'AH4NjDNd';
var secret = '8mWpy7XcmP56S9BT';
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

router.post('/thankyou', function(req, res, next) {
   console.log(req.body,'req') 
   console.log(res,'req')
   if(req.body.MESSAGE == 'Success'){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.redirect(`/thankyou`)
   }else{
        res.redirect(`/declined`)
   }
})

router.post('/sendtoairpay', function(req, res, next) {
	console.log('req.body',req.body);
	var md5 = require('md5');
	var sha256 = require('sha256');
	var dateformat = require('dateformat');
    alldata   = req.body.buyerAddress+req.body.amount+Number(req.body.orderid);
    udata = username+':|:'+password;
    privatekey = sha256(secret+'@'+udata);
    aldata = alldata+dateformat(now,'yyyy-mm-dd');
	checksum = md5(aldata+privatekey);
    fdata = req.body;
    let paymentObj = {         
        privatekey:privatekey,
        mercid:mid,
        currency:356,
        isocurrency:'INR',
        chmod:'',
        buyerEmail:fdata.buyerEmail,
        buyerPhone:fdata.buyerPhone,
        buyerFirstName:fdata.buyerFirstName,
        buyerAddress:fdata.buyerAddress,
        orderid:fdata.buyerPhone,
        amount:fdata.amount,
        checksum:checksum,
      }
    console.log('paymentObj paymentObj',paymentObj)

    res.send(paymentObj);

});

// subcription
router.post('/mealcount',subscriptionController.subscriptionCount)
router.post('/createSubs',subscriptionController.createSubs)
router.post('/updateSubs/:id',subscriptionController.updateSubs)
router.post('/updateStatus/:id',subscriptionController.updateStatus)
router.post('/updateSubBro/:id',subscriptionController.updateSubBro)
router.post('/getSub/:id',subscriptionController.getSub)
router.post('/getSubByUser/:user',subscriptionController.getSubByUser)

//menu
router.post('/getMenuByDate',menuController.getMenuByDate)

// locality
router.post('/getAllLocality',localityController.getAll)

// apartment
router.post('/getAptByLocality/:id',apartmentController.getAptByLocality)
router.post('/getAllApt',apartmentController.getAll)
router.post('/updateApt/:id',apartmentController.update)
router.post('/addTwr/:id',apartmentController.addTwr)

// user
router.post('/createUser',userController.createUser)
router.post('/updateUser',userController.updateUser)
router.post('/checkUser/:phone',userController.checkUser)
router.post('/checkUserId/:id',userController.checkUserId)
router.post('/getUserById/:id',userController.getUserById)

//calendar
router.post('/addCalendar',calendarController.add)
router.post('/updateCal',calendarController.update)
router.post('/getCal/:subId',calendarController.getCal)

//payment
router.post('/addPayment/:id',paymentController.add)
router.post('/getPayments/:id',paymentController.get)
router.post('/updatePaymentStatus/:id',paymentController.updateStatus)


module.exports = router;