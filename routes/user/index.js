var express = require('express');
var router = express.Router();



//send otp sign up functionalities
router.post('/sendotp', function(req, res) {
	  let signupotp = Math.floor(1000 + Math.random() * 9000);
      let phone = [];
      phone.push(Number(req.body.mobile));
  	  console.log('req.body',req.body)
  	  console.log('req.body',signupotp)
  	  console.log('req.body',phone)
  	  res.send(signupotp)
});

module.exports = router;