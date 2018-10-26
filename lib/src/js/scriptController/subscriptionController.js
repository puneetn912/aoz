var Request = require("request");
var mongoose = require('mongoose');
var Subscription = require('../../../models/subscription');


//save single Subscription
exports.subscriptionCount = (req, res, next) => {
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
      newSubscription.save((err, subscription) => {
        if (!err) {
          res.send(subscription);
        } else {
          console.log('sub error',err)
        };
      });
};

exports.createSubs = (req, res, next) => {
    var newSubscription = new Subscription();  
    
    newSubscription.user_id = req.body._id ? req.body._id : null;
    newSubscription.apartment_id = req.body.apartment_id ? req.body.apartment_id : null;
    newSubscription.apartment_name = req.body.apartment_name ? req.body.apartment_name : null;
    newSubscription.tower_name =  req.body.tower_name ? req.body.tower_name : null;
    newSubscription.veg_count = null;
    newSubscription.nonveg_count = null;
    newSubscription.amount = null;
    newSubscription.category = null;
    newSubscription.meal_type = null;
    newSubscription.start_date = null;
    newSubscription.end_date = null;
    newSubscription.veg_remain = null;
    newSubscription.nonveg_remain = null;
    newSubscription.days_count = null;
    newSubscription.status = false;
    newSubscription.door_no = null;
    
    newSubscription.save((err, subscription) => { if (!err) { res.send(subscription) } 
    else { console.log('sub error',err)}});
}

exports.update = (req, res, next) => {
  console.log('req.body',req.body);
  Subscription.findOne({ _id: req.params.id}).exec((err, subscription) => { if (!err) {
        subscription.category = req.body.category ? req.body.category : subscription.category;
        subscription.user_id = req.body.user_id ? req.body.user_id : subscription.user_id;
        subscription.user_name = req.body.user_name ? req.body.user_name : subscription.user_name;
        subscription.apartment_id = req.body.apartment_id ? req.body.apartment_id : subscription.category;
        subscription.apartment_name = req.body.apartment_name ? req.body.apartment_name : subscription.apartment_name;
        subscription.meal_type = req.body.meal_type ? req.body.meal_type : subscription.meal_type;
        subscription.start_date = req.body.start_date ? req.body.start_date : subscription.start_date;
        subscription.end_date = req.body.end_date ? req.body.end_date : subscription.end_date;
        subscription.veg_count = req.body.veg_count ? req.body.veg_count : subscription.veg_count;
        subscription.nonveg_count = req.body.nonveg_count ? req.body.nonveg_count : subscription.nonveg_count;
        subscription.veg_remain = req.body.veg_remain ? req.body.veg_remain : subscription.veg_remain;
        subscription.nonveg_remain = req.body.nonveg_remain ? req.body.nonveg_remain : subscription.nonveg_remain;
        subscription.days_count = req.body.days_count ? req.body.days_count : subscription.days_count;
        subscription.status = req.body.status == 'on' ? true : false;
        subscription.amount = req.body.amount ? req.body.amount : subscription.amount;
        subscription.tower_name = req.body.tower_name ? req.body.tower_name : subscription.tower_name;
        subscription.door_no = req.body.door_no ? req.body.door_no : subscription.door_no;
        
        subscription.save((err, SubscriptionUpdate) => {if (!err) { res.send(SubscriptionUpdate);
        } else { res.send(err) }});
      } else { return next(err) };
    });
};


exports.updateSubs = (req, res, next) => {
    console.log(req.body, req.params, 'req.body updateSub')
    let id = {_id:req.params.id}
    let set = {$set:{ 
        veg_remain:req.body.vegRemaining,
        nonveg_remain:req.body.nvegRemaining,
        veg_count:req.body.vegCount,
        nonveg_count:req.body.nvegCount,
        totalVegCount:req.body.totalVegCount,
        totalNvegCount:req.body.totalNvegCount, 
        meal_type:req.body.mealType,
        category:req.body.category
    }}

    Subscription.findOneAndUpdate(id,set,{new:true}).exec((err, data)=>{
    if(!err){ 
        res.send(data)
    }else{
     res.send(err) 
 }})
}

exports.updateSubBro = (req, res, next) => {
    console.log(req.body, req.params, 'req.body updateSub')
    let id = {_id:req.params.id}
    let set = {$set:{
        veg_remain:req.body.vegRem,
        nonveg_remain:req.body.nvegRem,
    }}

    Subscription.findOneAndUpdate(id,set,{new:true}).exec((err, data)=>{if(!err){ res.send(data)
    }else{ res.send(err) }})
}

exports.getSub = (req, res, next) =>{
    console.log(req.params.id,'param')
    Subscription.findOne({_id:req.params.id}).populate('user_id').exec((err,data)=>{if(!err){res.send(data)}else{res.send(err)}})
}

exports.getSubByUser = (req,res,next)=>{
    console.log(req.params.user,'param')
    Subscription.findOne({user_id:req.params.user},{apartment_id:1}).exec((err,data)=>{if(!err){res.send(data)}else{res.send(err)}})

}