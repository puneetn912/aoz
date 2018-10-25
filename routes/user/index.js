var express = require('express');
var router = express.Router();
var subscription = require('../../lib/models/subscription');
let subscriptionController = require('../../lib/src/js/scriptController/subscriptionController');
let localityController = require('../../lib/src/js/scriptController/localityController');
let apartmentController = require('../../lib/src/js/scriptController/apartmentController');
let userController = require('../../lib/src/js/scriptController/userController');
let calendarController = require('../../lib/src/js/scriptController/calendarController');

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

// subcription
router.post('/mealcount',subscriptionController.subscriptionCount)
router.post('/createSubs',subscriptionController.createSubs)
router.post('/updateSubs/:id',subscriptionController.updateSubs)
router.post('/getSub/:id',subscriptionController.getSub)
router.post('/getSubByUser/:user',subscriptionController.getSubByUser)

// locality
router.post('/getAllLocality',localityController.getAll)

// apartment
router.post('/getAptByLocality/:id',apartmentController.getAptByLocality)

// user
router.post('/createUser',userController.createUser)
router.post('/updateUser',userController.updateUser)
router.post('/checkUser/:phone',userController.checkUser)

//calendar
router.post('/addCalendar',calendarController.add)
router.post('/updateCalendar',calendarController.update)
router.post('/getCal/:subId',calendarController.getCal)

module.exports = router;