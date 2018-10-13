/* Code generator by Bharath */
var express = require('express');

var User = require('../models/user');
var Company = require('../models/company');
var OrderBook = require('../models/orderBook');
var Listing = require('../models/listing');

var list = (req, res, next) => {
  User.find()
    .sort('-created_at').populate('levelonecategorys').populate('leveltwocategorys').populate('levelthreecategorys').populate('reviews').populate('documents').populate('enquirys').populate('filtercats').populate('faqs').populate('localitys').populate('testimonials').populate('listings')
    .exec((err, userList) => {
      if (!err) {
        return next(null, userList);
      } else {
        return next(err);
      };
    });
};

var show = (req, res, next) => {
  User.findOne({ _id: req.params.id}).populate('levelonecategorys').populate('leveltwocategorys').populate('levelthreecategorys').populate('reviews').populate('documents').populate('enquirys').populate('filtercats').populate('faqs').populate('localitys').populate('testimonials').populate('listings')
    .exec((err, user) => {
      if (!err) {
        return next(null, user);
      } else {
        return next(err);
      };
    });
};

var save = (req, res, next) => {
  var newUser = new User();  
    newUser.name = req.body.name ? req.body.name : null; 
	newUser.parentUser_id = req.body.parentUser_id ? req.body.parentUser_id : null;
	newUser.email = req.body.email ? req.body.email : null;
	newUser.mobileno = req.body.mobileno ? req.body.mobileno : null;
	newUser.roles ={
        manager:req.body.manager =='on' ? true : false,
        sales:req.body.sales =='on' ? true : false,
        merchant:req.body.merchant == 'on' ? true : false
    },
	newUser.verified = req.body.verified == 'on' ? true : false;
	newUser.isAdmin = req.body.isAdmin == 'on' ? true : false;
      newUser.save((err, user) => {
        if (!err) {
          return next(null, user);
        } else {
          return next(err);
        };
      });
};

var update = (req, res, next) => {
  User.findOne({ _id: req.params.id})
    .exec((err, user) => {
      if (!err) {
				user.name = req.body.name  ? req.body.name : user.name;
                user.parentUser_id = req.body.parentUser_id ? req.body.parentUser_id : user.parentUser_id;
				user.email = req.body.email  ? req.body.email : user.email;
				user.mobileno = req.body.mobileno  ? req.body.mobileno : user.mobileno;
				user.password = req.body.password  ? req.body.password : user.password;
				user.roles ={
                    manager:req.body.manager =='on' ? true : false,
                    sales:req.body.sales =='on' ? true : false,
                    merchant:req.body.merchant == 'on' ? true : false
                },
				user.verified = req.body.verified=='on' ? true : false;
				user.isAdmin = req.body.isAdmin=='on' ? true : false;
        user.save((err, UserUpdate) => {
          if (!err) {
        Company.updateMany({ user_id: UserUpdate._id},{
          "mobileno":UserUpdate.mobileno,
          "email":UserUpdate.email
          }).exec((err, companyUpdate) =>
          {
            if(!err)
            {
              OrderBook.updateMany({ user_id: UserUpdate._id},{
                "user_id":UserUpdate._id
                }).exec((err, orderUpdate) =>
                {
                 
                  if(!err)
                  {
                    console.log('orderUpdate orderUpdate',orderUpdate)
                    Listing.updateMany({ user_id: UserUpdate._id},{
                        "user_id":UserUpdate._id
                      }).exec((err, listingUpdate) =>
                      {
                        if(!err)
                        {
                          console.log('listingUpdate listingUpdate',listingUpdate)
                        }
                      })
                  }
                })
            }
            })
            return next(null, UserUpdate);
          } else {
            return next(err);
          };
        });
      } else {
        return next(err);
      };
    });
};

var remove = (req, res, next) => {
  User.findOne({ _id: req.params.id})
    .exec((err, user) => {
      if (!err) {
          Company.updateMany({ user_id: user._id},{$set:{
            "delActivityStatus":0
          }}).exec((err, companyUpdate) =>
          {
          if(!err)
          {
            console.log('companyUpdate companyUpdate',companyUpdate)
              OrderBook.updateMany({ user_id: user._id},{$set:{
                "delActivityStatus":0
              }}).exec((err, orderUpdate) =>
              {
                if(!err)
                {
                    console.log('orderUpdate orderUpdate',orderUpdate)
                    Listing.updateMany({ user_id: user._id},{$set:{
                      "delActivityStatus":0
                    }}).exec((err, listingUpdate) =>
                    {
                      if(!err)
                      {
                          console.log('listingUpdate listingUpdate',listingUpdate)
                      }
                    })
                }
              })
          }
          })
        user.remove((err) => {
          if (!err) {
            return next(null, {message: 'User was deleted!'});
          } else {
            return next(err);
          }
        });
      } else {
        return next(err);
      };
    });
};

module.exports = {
  list: list,
  show: show,
  save: save,
  update: update,
  remove: remove
}
/* End of File */