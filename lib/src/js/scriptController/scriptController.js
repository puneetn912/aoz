var Request = require("request");
var mongoose = require('mongoose');
var Subscription = require('../../../models/subscription');


//save single Subscription
exports.subscriptionCount = (req, res, next) => {
  console.log('req.body',typeof req.body.veg_count)
  var newSubscription = new Subscription();  
    newSubscription.category = req.body.category ? req.body.category : null;
    newSubscription.user_id = req.body.user_id ? req.body.user_id : null;
    newSubscription.user_name = req.body.user_name ? req.body.user_name : null;
    newSubscription.apartment_id = req.body.apartment_id ? req.body.apartment_id : null;
    newSubscription.apartment_name = req.body.apartment_name ? req.body.apartment_name : null;
    newSubscription.meal_type = req.body.meal_type ? req.body.meal_type : null;
    newSubscription.start_date = req.body.start_date ? req.body.start_date : null;
    newSubscription.end_date = req.body.end_date ? req.body.end_date : null;
    newSubscription.veg_count = req.body.veg_count ? req.body.veg_count : null;
    newSubscription.nonveg_count = req.body.nonveg_count ? req.body.nonveg_count : null;
    newSubscription.veg_remain = req.body.veg_remain ? req.body.veg_remain : null;
    newSubscription.nonveg_remain = req.body.nonveg_remain ? req.body.nonveg_remain : null;
    newSubscription.amount = req.body.amount ? req.body.amount : null;
    newSubscription.days_count = req.body.days_count ? req.body.days_count : null;
    newSubscription.status = req.body.status == 'on' ? true : false;
    newSubscription.tower_name = req.body.tower_name ? req.body.tower_name : null;
    newSubscription.door_no = req.body.door_no ? req.body.door_no : null;
      console.log('newSubscription',newSubscription);
      newSubscription.save((err, subscription) => {
        if (!err) {
          res.redirect("/subscribe");
        } else {
          console.log('subscription',subscription)
          // res.render('/calender/subscription._id');
        };
      });
};