var express = require('express');
var router = express.Router();
var subscription = require('../../lib/models/subscription');
let subscriptionController = require('../../lib/src/js/scriptController/subscriptionController');
let localityController = require('../../lib/src/js/scriptController/localityController');
let apartmentController = require('../../lib/src/js/scriptController/apartmentController');

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

// locality
router.post('/getAllLocality',localityController.getAll)

// apartment
router.post('/getAptByLocality/:id',apartmentController.getAptByLocality)

module.exports = router;