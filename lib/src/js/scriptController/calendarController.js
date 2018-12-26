var Request = require("request");
var mongoose = require('mongoose');
var Calendar = require('../../../models/calender');
var Subscription = require('../../../models/subscription');

exports.add = (req, res, next) => {
    console.log(req.body,'add Cal')
    if(req.body.length>0){
        Calendar.find({subscription_id:req.body[0].subscription_id}).exec((err, data)=>{if(!err){
            console.log(data,'data')
            if(data.length==0){
                Calendar.insertMany(req.body, function(err, data) {if(!err){res.send(data)
                }else{res.send(err)}});             
            }else{res.send('data already added')}
        }else{res.send(err)}})
    }
}
exports.update = (req, res, next) => {
    if(req.body[0].subId){
        console.log(req.body, 'cal data update')
        Calendar.find({subscription_id:req.body[0].subId }).remove().exec((err,data)=>{
            if(err){console.log(err)}else{
                var newCal = new Calendar();
                newCal.subscription_id = req.body[0].subId ? req.body[0].subId : null;
                newCal.userId = req.body[0].userId ? req.body[0].userId : null;
                newCal.apartment_id = req.body[0].apartment_id ? req.body[0].apartment_id : null;
                newCal.selected_data = req.body[0].selected_data ? req.body[0].selected_data : null;
                newCal.save((err, data) => {
                    if (!err) {
                        console.log(data);
                    } else {
                        console.log(err);
                    }
                });
            }
        })
    }else{
        let obj = req.body.map((x,i)=>{
            return {selected_data:x.date, 
                veg_count_on_day:x.vegCount, 
                nonVeg_count_on_day:x.nonVegcount, 
                subscription_id:x.subscriptionId, 
                apartment_id:x.apartment_id,
                user_id:x.user_id,
                caterer_veg_id:x.caterer_veg_id,
                caterer_nonveg_id:x.caterer_nonveg_id
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


exports.delCal = (req, res, next) => {
    console.log(req.body, 'calObj')
    let query = {_id:req.body.subscription_id}
    let set = 
    Subscription.findOne(query).exec((err,sub)=>{
        console.log(sub,'sub')
        console.log(sub.veg_count_on_day,'sub')
        console.log(sub.nonVeg_count_on_day,'sub')
        
        let vc = parseInt(sub.veg_count_on_day)
        let nvc = parseInt(sub.nonVeg_count_on_day)
        vc--
        nvc--
        let query = {_id:req.body.subscription_id}
        let set = {
            veg_count_on_day:vc,
            nonVeg_count_on_day:nvc
        }
        Subscription.findOneAndUpdate(query, set).exec((err,subUpdated)=>{
            console.log(subUpdated,'subUpdated')
            Calendar.remove({_id:req.params.calId}).exec((err, data)=>{
                if(!err){
                    res.send(data)
                }else{
                    res.send(err)
                }
            })
        })

    })

}

exports.updateCalOne = (req, res, next) => {
    console.log(req.params.subId,'params')
    console.log(req.body,'data')
    let vegRem = 5
    let nvegRem = 5
    
    let query = {_id:req.body.subscription_id}
    let set = {veg_remain:vegRem, nonveg_remain:nvegRem}
    
    Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,sub)=>{
        console.log(sub, 'sub')
        let query = {subscription_id:req.body.subscription_id, selected_data:req.body.selected_data }
        let set = {            
            subscription_id : req.body.subscription_id, 
            selected_data : req.body.selected_data  ,
            veg_count_on_day : req.body.veg_count_on_day,
            nonVeg_count_on_day : req.body.nonVeg_count_on_day,
            month : req.body.month,
            user_id : req.body.user_id,
            apartment_id : req.body.apartment_id,
            caterer_veg_id : req.body.caterer_veg_id,
            caterer_nonveg_id : req.body.caterer_nonveg_id
        }

        Calendar.findOneAndUpdate(query, set, {new: true, upsert: true}).exec((err,data)=>{
            if(err){res.send(err)}else{res.send(data)}
        })
    })

}
exports.pauseSub = (req,res,next) =>{
    console.log(req.body, 'req.body')
    let vegRemAftPause = 0 
    let nvegRemAftPause = 0
    let subId = ''
    if(req.body){
        if(req.body.length>0){
            let query = {_id:req.body[0].subscription_id}
            Subscription.findOne(query).exec((err,data)=>{if(err){console.log(err)}else{
                console.log(data,'Subscription')
                vegRemAftPause = data.veg_remain
                nvegRemAftPause = data.nonveg_remain

                req.body.map((x,i)=>{
                    let vegDay = Number(x.veg_count_on_day)
                    let nvegDay = Number(x.nonVeg_count_on_day)

                    subId = x.subscription_id
                    vegRemAftPause += vegDay
                    nvegRemAftPause += nvegDay

                    if(i==req.body.length-1){
                        console.log(vegRemAftPause,'vegRemAftPause')
                        console.log(nvegRemAftPause,'nvegRemAftPause')
                        let query = {_id:subId}
                        let set = {$set:{veg_remain:vegRemAftPause, nonveg_remain: nvegRemAftPause, account_status: false}}
                        Subscription.findOneAndUpdate(query, set, {new:true}).exec((err, data)=>{if(err){console.log(err)}else{
                            Calendar.remove({_id:{$in:req.body}}).exec((err,data)=>{
                                console.log(data,'Calendar')
                                res.send('done')
                            })
                        }})
                    }
                })
            }})
        }else{
            console.log(req.params.subId,'params')
            let query = {_id:req.params.subId}
            let set = {$set:{account_status:false}}
            Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,data)=>{
                console.log(data,'Subscription')
                res.send('done')
            })
        }
    }
}