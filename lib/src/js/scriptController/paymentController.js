var Request = require("request");
var mongoose = require('mongoose');
var Payment = require('../../../models/payment');

//save single Subscription
// exports.add = (req, res, next) => {
//     console.log(req.params,'req.params')
//     Payment.find({locality_id:req.params.id}).exec((err, data)=>{if(err){res.send(err)}
//     else{ res.send(data) }})
// };

exports.get = (req, res, next)=>{
    let query = {subscription_id:req.params.id}
    Payment.find(query).exec((err,data)=>{
        if(err){res.send(err)}else{res.send(data)}
    })
    Payment.find({}).exec((err,data)=>{
        if(err){res.send(err)}else{res.send(data)}
    })
}

exports.add = (req,res,next)=>{
    console.log(req.params.id, req.body, 'params')
    var newPayment = new Payment();  
    
    newPayment.subscription_id = req.params.id ? req.params.id : null;
    newPayment.veg_count = req.body.veg_count ? req.body.veg_count : null;
    newPayment.nonveg_count = req.body.nonveg_count ? req.body.nonveg_count : null;
    newPayment.amount = req.body.amount ? req.body.amount : null;
    newPayment.order_no =  req.body.order_no ? req.body.order_no : null;
    newPayment.meal_type =  req.body.meal_type ? req.body.meal_type : null;
    
    newPayment.save((err, data) => { if (!err) { res.send(data) } 
    else { res.send(err) }});
}

exports.update = (req,res,next)=>{
    console.log(req.params.id, req.body, 'params')
    var newPayment = new Payment();  
    
    newPayment.subscription_id = req.params.id ? req.params.id : null;
    newPayment.veg_count = req.body.veg_count ? req.body.veg_count : null;
    newPayment.nonveg_count = req.body.nonveg_count ? req.body.nonveg_count : null;
    newPayment.amount = req.body.amount ? req.body.amount : null;
    newPayment.order_no =  req.body.order_no ? req.body.order_no : null;
    
    newPayment.save((err, data) => { if (!err) { res.send(data) } 
    else { res.send(err) }});
}

exports.updateStatus = (req,res,next) => {
    let query = {_id:req.params.id}
    let set = {status: true}

    Payment.findOneAndUpdate(query, set, {new:true}).exec((err,data)=>{
        if(err){res.send(err)}else{res.send(data)}
    })
}