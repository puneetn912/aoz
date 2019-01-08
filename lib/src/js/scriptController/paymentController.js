var Request = require("request");
var mongoose = require('mongoose');
var Payment = require('../../../models/payment');
var Subscription = require('../../../models/subscription');

exports.get = (req, res, next)=>{
    console.log(req.params.id,'req.params.id')
    let query = {subscription_id:req.params.id}
    Payment.find(query).sort({created_at:-1}).exec((err,data)=>{
        if(err){res.send(err)}else{

            console.log('paymeny date',data)
            res.send(data)
        }
    })
}

exports.add = (req,res,next)=>{
    console.log(req.params.id, req.body, 'params')
    var newPayment = new Payment();  
    
    newPayment.subscription_id = req.params.id ? req.params.id : null;
    newPayment.veg_count = req.body.veg_count ? req.body.veg_count : 0;
    newPayment.nonveg_count = req.body.nonveg_count ? req.body.nonveg_count : 0;
    newPayment.amount = req.body.amount ? req.body.amount : 0;
    newPayment.order_no =  req.body.order_no ? req.body.order_no : null;
    newPayment.meal_type =  req.body.meal_type ? req.body.meal_type : null;
    newPayment.user_id =  req.body.user_id ? req.body.user_id : null;
    
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

    Payment.findOneAndUpdate(query, set, {new:true}).exec((err,data)=>{ if(err){res.send(err)}else{
        res.send(data)
    }})
}

exports.updateStatusNative = (req,res,next) => {
    let query = {_id:req.params.id}
    let set = {status: true}

    Payment.findOneAndUpdate(query, set, {new:true}).populate('subscription_id').exec((err,payment)=>{ if(err){res.send(err)}else{
        let pvc = parseInt(payment.veg_count)
        let pnvc = parseInt(payment.nonveg_count)

        let stvc = parseInt(payment.subscription_id.totalVegCount)
        let stnvc = parseInt(payment.subscription_id.totalNvegCount)
        let srvc = parseInt(payment.subscription_id.veg_remain)
        let srnvc = parseInt(payment.subscription_id.nonveg_remain)

        let fvc = parseInt(payment.veg_count)
        let fnvc = parseInt(payment.nonveg_count)
        let ftvc = pvc + stvc
        let ftnvc = pnvc + stnvc

        let frvc = 0, frnvc = 0
        if(payment.subscription_id.status == true){
            frvc = srvc + pvc 
            frnvc = srnvc + pnvc
        }

        let query = {_id:payment.subscription_id._id}
        let set = {
            veg_count : fvc,
            nonveg_count: fnvc,
            totalNvegCount: ftnvc,
            totalVegCount: ftvc,
            veg_remain: frvc,
            nonveg_remain: frnvc,
            status:true
        }
        Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,data)=>{
            console.log(data,'sub')
            console.log(payment, 'payment')
            res.send(payment)
        })
    }})
}