var Request = require("request");
var mongoose = require('mongoose');
var Calendar = require('../../../models/calender');

exports.add = (req, res, next) => {
    Calendar.find({subscription_id:req.body[0].subscription_id}).exec((err, data)=>{if(!err){
        if(data.length==0){
            Calendar.insertMany(req.body, function(err, data) {if(!err){res.send(data)
            }else{res.send(err)}});             
        }else{res.send('data already added')}
    }else{res.send(err)}})
}
exports.update = (req, res, next) => {
    if(req.body[0].subId){
        console.log(req.body)
        Calendar.find({subscription_id:req.body[0].subId }).remove().exec((err,data)=>{
            if(err){console.log(err)}else{console.log(data)}
        })
    }else{
        let obj = req.body.map((x,i)=>{
            return {selected_data:x.date, 
                veg_count_on_day:x.vegCount, 
                nonVeg_count_on_day:x.nonVegcount, 
                subscription_id:x.subscriptionId, 
                apartment_id:x.apartment_id,
                user_id:x.user_id
            }
        })
        console.log(obj,'obj')

        Calendar.find({subscription_id:obj[0].subscription_id }).remove().exec((err,data)=>{
            obj.map((x,i)=>{
                Calendar.update({subscription_id:x.subscription_id, selected_data:x.selected_data}, x, {new: true, upsert: true}).exec((err,data)=>{
                    if(err){console.log(err)}else{console.log(data)}
                })
            })
        });
    }
    res.send('all done')
}
exports.getCal = (req, res, next) => {
    Calendar.find({subscription_id:req.params.subId}).exec((err, data)=>{if(!err){res.send(data)
    }else{res.send(err)}})
}