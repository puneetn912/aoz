var express = require('express');
var passport = require('passport');
var router = express.Router();


router.post('/', passport.authenticate('local-login', {
	successRedirect: '/dashboard',
	failureRedirect: '/',
	failureFlash: true
}));



router.get('/logout', isLoggedIn, function(req, res){
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/dashboard', isLoggedIn, function(req, res){
	res.redirect('admin/users');
});

module.exports = router;