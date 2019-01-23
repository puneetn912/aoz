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
let mailController = require('../../lib/src/js/scriptController/mailController');
let pageController = require('../../lib/src/js/scriptController/pageController');
let notifyController = require('../../lib/src/js/scriptController/notifyController');

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
    if(req.body.MESSAGE == 'Success'){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.redirect(`/thankyou`)
    }else{
        res.redirect(`/declined`)
    }
})
router.post('/declined', function(req, res, next) {
    res.redirect('/declined')
})

router.post('/sendtoairpay', function(req, res, next) {
    console.log('req.body',req.body);
    let mid = '', username = '', password = '', secret='', now = new Date();
    
    if(process.env.NODE_ENV == 'stage'){
        console.log('entered stage payment')
        mid = '24324';
        username = '5168160';
        password = 'NBTh6GXx';
        secret = 'KVnqNAjbh8wKE6wM';
    }else{
        mid = '26239';
        username = '5895556';
        password = 'AH4NjDNd';
        secret = '8mWpy7XcmP56S9BT';
    }

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
router.post('/createSubs',subscriptionController.createSubs)
router.post('/updateSubs/:id',subscriptionController.updateSubs)
router.post('/updateStatus/:id',subscriptionController.updateStatus)
router.post('/updateSubBro/:id',subscriptionController.updateSubBro)
router.post('/getSub/:id',subscriptionController.getSub)
router.post('/getSubNative/:id',subscriptionController.getSubNative)
router.post('/getSubByUser/:user',subscriptionController.getSubByUser)
router.post('/getSubByUserNative/:user',subscriptionController.getSubByUserNative)

//menu
router.post('/getMenuByDate',menuController.getMenuByDate)

//leads
router.post('/addContactLead',pageController.addContactLead)
router.post('/addChefLead',pageController.addChefLead)
router.post('/addEnquiry',pageController.addEnquiry)
router.post('/feedback',pageController.addFeedback)

// locality
router.post('/getAllLocality',localityController.getAll)

// apartment
router.post('/addApt',apartmentController.addApt)
router.post('/getAptByLocality/:id',apartmentController.getAptByLocality)
router.post('/getAptById/:id',apartmentController.getAptById)
router.post('/getAllApt',apartmentController.getAll)
router.post('/updateApt/:id',apartmentController.update)
router.post('/addTwr/:id',apartmentController.addTwr)

// user
router.post('/createUser',userController.createUser)
router.post('/createUserNative',userController.createUserNative)
router.post('/updateUser',userController.updateUser)
router.post('/checkUser/:phone',userController.checkUser)
router.post('/checkUserId/:id',userController.checkUserId)
router.post('/getUserById/:id',userController.getUserById)

//calendar
router.post('/addCalendar',calendarController.add)
router.post('/updateCal',calendarController.update)
router.post('/getCal/:subId',calendarController.getCal)
router.post('/delCal/:cId',calendarController.delCal)
router.post('/updateCalOne/:subId',calendarController.updateCalOne)
router.post('/pauseSub/:subId',calendarController.pauseSub)
router.post('/resumeSub/:id',calendarController.resumeSub)

//payment
router.post('/addPayment/:id',paymentController.add)
router.post('/getPayments/:id',paymentController.get)
router.post('/updatePaymentStatus/:id',paymentController.updateStatus)
router.post('/updatePaymentStatusNative/:id',paymentController.updateStatusNative)
router.post('/getMealCost',paymentController.getMealCost)

router.post('/sendMail', mailController.test )

// Notify
// router.post('/notify', notifyController.notify )
// router.post('/notifyOne', notifyController.notifyOne )
// router.post('/getScheduleNotice', notifyController.getScheduleNotice )
router.post('/storeToken', notifyController.storeToken )


module.exports = router;