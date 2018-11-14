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
    let query = {user_id:req.body._id}
    let set = {
        user_id: req.body._id,
        user_name: req.body.name,
        apartment_id: req.body.apartment_id,
        apartment_name: req.body.apartment_name,
        tower_name: req.body.tower_name,
        veg_count:0,
        nonveg_count:0,
        totalVegCount:0,
        totalNvegCount:0,
        veg_remain:0,
        nonveg_remain:0,
    }

    Subscription.findOneAndUpdate(query, set, {new: true, upsert: true}).populate('user_id').exec((err,data)=>{
        if(err){res.send(err)}else{res.send(data)}
    })
}

exports.updateStatus = (req,res,next) => {
    let query = {_id:req.params.id}
    let set = {status: true}

    Subscription.findOneAndUpdate(query, set, {new:true}).populate('user_id').exec((err,data)=>{
        if(err){res.send(err)}else{res.send(data)}
    })
}

exports.create = (req,res,next)=>{
    var newSubscription = new Subscription();  
    
    newSubscription.user_id = req.body._id ? req.body._id : null;
    newSubscription.user_name = req.body.name ? req.body.name : null;
    newSubscription.apartment_id = req.body.apartment_id ? req.body.apartment_id : null;
    newSubscription.apartment_name = req.body.apartment_name ? req.body.apartment_name : null;
    newSubscription.tower_name =  req.body.tower_name ? req.body.tower_name : null;
    newSubscription.veg_count = 0;
    newSubscription.nonveg_count = 0;
    newSubscription.totalVegCount = 0;
    newSubscription.nonveg_count = 0;
    newSubscription.veg_remain = 0;
    newSubscription.nonveg_remain = 0;
    newSubscription.amount = req.body.amount ? req.body.amount : null;
    newSubscription.category = req.body.category ? req.body.category : null;
    newSubscription.meal_type = req.body.meal_type ? req.body.meal_type : null;
    newSubscription.start_date = req.body.start_date ? req.body.start_date : null;
    newSubscription.end_date = req.body.end_date ? req.body.end_date : null;
    newSubscription.days_count = req.body.days_count ? req.body.days_count : null;
    newSubscription.status = false;
    newSubscription.door_no = req.body.tower_name ? req.body.tower_name : null;
    
    newSubscription.save((err, subscription) => { if (!err) { res.send(subscription) } 
    else { console.log('sub error',err)}});
}

exports.update = (req, res, next) => {
  console.log('req.body',req.body);
  console.log(req.body.category,'req.body')
  Subscription.findOne({ _id: req.params.id}).exec((err, subscription) => { if (!err) {
        subscription.category = req.body.category ? req.body.category : subscription.category;
        subscription.user_id = req.body.user_id ? req.body.user_id : subscription.user_id;
        subscription.user_name = req.body.user_name ? req.body.user_name : subscription.user_name;
        subscription.apartment_id = req.body.apartment_id ? req.body.apartment_id : subscription.category;
        subscription.apartment_name = req.body.apartment_name ? req.body.apartment_name : subscription.apartment_name;
        subscription.start_date = req.body.start_date ? req.body.start_date : subscription.start_date;
        subscription.end_date = req.body.end_date ? req.body.end_date : subscription.end_date;
        subscription.meal_type = req.body.meal_type ? req.body.meal_type : subscription.meal_type;
        subscription.veg_count = req.body.veg_count ? req.body.veg_count : subscription.veg_count;
        subscription.nonveg_count = req.body.nonveg_count ? req.body.nonveg_count : subscription.nonveg_count;
        subscription.veg_remain = req.body.veg_remain ? req.body.veg_remain : subscription.veg_remain;
        subscription.nonveg_remain = req.body.nonveg_remain ? req.body.nonveg_remain : subscription.nonveg_remain;
        subscription.totalVegCount = req.body.totalVegCount ? req.body.totalVegCount : subscription.totalVegCount;
        subscription.totalNvegCount = req.body.totalNvegCount ? req.body.totalNvegCount : subscription.totalVegCount;
        subscription.amount = req.body.amount ? req.body.amount : subscription.amount;
        subscription.tower_name = req.body.tower_name ? req.body.tower_name : subscription.tower_name;
        subscription.door_no = req.body.door_no ? req.body.door_no : subscription.door_no;
        subscription.status = req.body.status == 'on' ? true : false;
        subscription.days_count = req.body.days_count ? req.body.days_count : subscription.days_count;
        
        subscription.save((err, SubscriptionUpdate) => {if (!err) { res.send(SubscriptionUpdate);
        } else { res.send(err) }});
      } else { return next(err) };
    });
};


exports.updateSubs = (req, res, next) => {
    console.log(req.body, req.params, 'req.body updateSub')
    let id = {_id:req.params.id}

    let set = {$set:{ 
        veg_remain:req.body.veg_remain,
        nonveg_remain:req.body.nonveg_remain,
        veg_count:req.body.veg_count,
        nonveg_count:req.body.nonveg_count,
        totalVegCount:req.body.totalVegCount,
        totalNvegCount:req.body.totalNvegCount, 
        meal_type:req.body.meal_type,
        category:req.body.category
    }}

    Subscription.findOneAndUpdate(id,set,{new:true}).populate('user_id').exec((err, data)=>{
    if(!err){ res.send(data) }else{ res.send(err) }})
}

exports.updateSubBro = (req, res, next) => {
    console.log(req.body, req.params, 'req.body updateSub')
    let id = {_id:req.params.id}
    let set = {$set:{
        veg_remain:req.body.vegRemFinal,
        nonveg_remain:req.body.nvegRemFinal,
    }}

    Subscription.findOneAndUpdate(id,set,{new:true}).populate('user_id').exec((err, data)=>{
    if(!err){ res.send(data)}else{ res.send(err) }})
}

exports.getSub = (req, res, next) =>{
    console.log(req.params.id,'param')
    Subscription.findOne({_id:req.params.id}).populate('user_id').exec((err,data)=>{
    if(!err){res.send(data)}else{res.send(err)}})
}

exports.getSubByUser = (req,res,next)=>{
    console.log(req.params.user,'param')
    Subscription.findOne({user_id:req.params.user}).populate('user_id').exec((err,data)=>{
    if(!err){res.send(data)}else{res.send(err)}})

}