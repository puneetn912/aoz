/* Code generator by Bharath */
var express = require('express');

module.exports = (passport) => {
  var LocalStrategy = require('passport-local').Strategy;
  // var FacebookStrategy = require('passport-facebook').Strategy;
  // var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  var Admin = require('./models/admin');

  passport.serializeUser((admin, done) => {
		done(null, admin.id);
	});

	passport.deserializeUser((id, done) => {
		Admin.findById(id, (err, admin) => {
			done(err, admin);
		});
	});

  passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
    console.log('namenamenamename',req.body.name)
    console.log('emailemailemail',email)
    console.log('passwordpasswordpassword',password)
		process.nextTick(function(){
			Admin.findOne({'email': email}, function(err, admin){
				if(err)
					return done(err);
				if(admin){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				}
				if(!req.admin) {
					var newAdmin = new Admin();
          newAdmin.name = req.body.name ? req.body.name : null;
          newAdmin.email = email;
          newAdmin.username = email;
					newAdmin.passwordDe = password;
					newAdmin.password = newAdmin.generateHash(password);

					newAdmin.save(function(err){
						if(err)
							throw err;
						return done(null, newAdmin);
					})
				} else {
					var admin = req.admin;
          admin.local.name = req.body.name ? req.body.name : email;
					admin.local.username = email;
					admin.local.password = admin.generateHash(password);

					admin.save(function(err){
						if(err)
							throw err;
						return done(null, admin);
					})
				}
			})

		});
	}));

    passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
      console.log('emailemail',email)
      console.log('passwordpassword',password)
			process.nextTick(function(){
				Admin.findOne({ 'email': email}, function(err, admin){
					if(err)
						return done(err);
					if(!admin)
						return done(null, false, req.flash('loginMessage', 'No Admin found'));
					if(!admin.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					return done(null, admin);
				});
			});
		}
	));

//   passport.use(new FacebookStrategy({
//     clientID: process.env.facebookAuth_clientID,
//     clientSecret: process.env.facebookAuth_clientSecret,
//     callbackURL: process.env.facebookAuth_callbackURL,
//     passReqToCallback: true
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//     	process.nextTick(function(){
//     		//user is not logged in yet
//     		if(!req.user){
//   			User.findOne({'facebook.id': profile.id}, function(err, user){
//       			if(err)
//       				return done(err);
//       			if(user){
//       				if(!user.facebook.token){
//       					user.facebook.token = accessToken;
//       					user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
//       					user.facebook.email = profile.emails[0].value;
//       					user.save(function(err){
//       						if(err)
//       							throw err;
//       					});

//       				}
//       				return done(null, user);
//       			}
//       			else {
//       				var newUser = new User();
//       				newUser.facebook.id = profile.id;
//       				newUser.facebook.token = accessToken;
//       				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
//       				newUser.facebook.email = profile.emails[0].value;

//       				newUser.save(function(err){
//       					if(err)
//       						throw err;
//       					return done(null, newUser);
//       				})
//       			}
//       		});
//     		}

//     		//user is logged in already, and needs to be merged
//     		else {
//     			var user = req.user;
//     			user.facebook.id = profile.id;
//     			user.facebook.token = accessToken;
//     			user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
//     			user.facebook.email = profile.emails[0].value;

//     			user.save(function(err){
//     				if(err)
//     					throw err
//     				return done(null, user);
//     			})
//     		}

//     	});
//     }

//   ));

//   passport.use(new GoogleStrategy({
//     clientID: process.env.googleAuth_clientID,
//     clientSecret: process.env.googleAuth_clientSecret,
//     callbackURL: process.env.googleAuth_callbackURL,
//     passReqToCallback: true
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//     	process.nextTick(function(){

//     		if(!req.user){
//     			User.findOne({'google.id': profile.id}, function(err, user){
//       			if(err)
//       				return done(err);
//       			if(user){
//       				if(!user.google.token){
//       					user.google.token = accessToken;
//       					user.google.name = profile.displayName;
//       					user.google.email = profile.emails[0].value;
//       					user.save(function(err){
//       						if(err)
//       							throw err;
//       					});
//       				}
//       				return done(null, user);
//       			}
//       			else {
//       				var newUser = new User();
//       				newUser.google.id = profile.id;
//       				newUser.google.token = accessToken;
//       				newUser.google.name = profile.displayName;
//       				newUser.google.email = profile.emails[0].value;

//       				newUser.save(function(err){
//       					if(err)
//       						throw err;
//       					return done(null, newUser);
//       				})
//       			}
//       		});
//     		} else {
//     			var user = req.user;
//     			user.google.id = profile.id;
//   			  user.google.token = accessToken;
//   			  user.google.name = profile.displayName;
//   			  user.google.email = profile.emails[0].value;

//   			  user.save(function(err){
//   				  if(err)
//   					  throw err;
//   				  return done(null, user);
//   			  });
//     		}
//     	});
//     }
//   ));
};
/* End of File */
