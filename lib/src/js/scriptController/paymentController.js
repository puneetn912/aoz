var Request = require("request");
var mongoose = require('mongoose');
var Payment = require('../../../models/payment');
var Subscription = require('../../../models/subscription');
var Calendar = require('../../../models/calender');

var smsgateway = require("../../../../mails/smsgateway.js");
// //console.log(smsgateway,'smsgateway')

exports.get = (req, res, next)=>{
    //console.log(req.params.id,'req.params.id')
    let query = {subscription_id:req.params.id}
    Payment.find(query).sort({created_at:-1}).exec((err,data)=>{
        if(err){res.send(err)}else{

            //console.log('paymeny date',data)
            res.send(data)
        }
    })
}

exports.add = (req,res,next)=>{
    console.log(req.params.id, req.body, 'params')
    let date = new Date(req.body.payment_date)
    console.log(date,'date')
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
    //console.log(req.params.id, req.body, 'params')
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

    // update payment status
    // get payment vc and nvc
    // get sub tvc tnvc rvc and nrvc
    // calclate tvc by adding existing subs vc to pvc
    // if existing sub status is true then calculat rc by adding pvc to existing sub rc
    // update sub with rc, vc , tvc and status
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
        let startDate = payment.subscription_id.start_date || new Date()
        if(payment.subscription_id.status == true){
            frvc = srvc + pvc
            frnvc = srnvc + pnvc
        }else{
            // assign start date to subscription
            // array banake cal mein bhejna hai based on the payment date
            // startDate = payment.updatedAt

            let finalArray =[]

            let launchDate = new Date("Jan 21 2019")
            launchDate.setHours(5,30,0,0)
            //console.log(launchDate, 'LAUNCH DATE SHOUD BE 17TH MIDNIGHT ')

            let serverDate = new Date() //11, 1140
            serverDate.setHours(serverDate.getHours() + 5)
            serverDate.setMinutes(serverDate.getMinutes() + 30)
            //console.log(serverDate, "SERVER DATE SHOULD BE 19TH MIDNIGHT")

            let borderDate = new Date()  //11
            borderDate.setHours(20,0,0,0)  //11 , 1000
            //console.log(borderDate, 'BORDERDATE SHOULD BE 19TH , 10 AM')

            // 11, 1140 < 17,0000
            if(serverDate < launchDate){
                //console.log('REQUEST B4 LAUNCHDATE')
                serverDate = launchDate     //serdate is 17, 0000
                //console.log(serverDate, 'SERVERDATE SHOULD BE 17TH MIDNIGHT')
                borderDate = launchDate     //bordDate is 17, 0000
                borderDate.setHours(20,0,0,0)  // borderdate is 17, 1000
            }

            // 17,0000 > 17,1000
            if(serverDate > borderDate ){
                //console.log('REQUESTED AFTER 10 TODAY')
                serverDate.setDate(serverDate.getDate() + 1)
                //console.log(serverDate, 'SERVERDATE SHOULD BE 20TH AFTERNOON') 
            }else{
                //console.log(serverDate, 'SERVERDATE SHOULD BE 19TH PAST MIDNIGHT') 
            }

            let query = {_id:payment.subscription_id._id}
            Subscription.findOne(query).populate('apartment_id').exec((err,subData)=>{
                //console.log(subData,'subData')
            
                let vegCount = pvc
                let nvegCount = pnvc
                Array.from({length: vegCount}, (x,i) => {
                    var day = serverDate;

                    var nextDay = new Date(day)
                    nextDay.setDate(day.getDate()+i);
                    nextDay = nextDay.toString().slice(3,15)

                    finalArray.push({selected_data:nextDay, veg_count_on_day:1, nonVeg_count_on_day:0, 
                        subscription_id:subData._id,
                        subscriber_name:'user',
                        month:nextDay.slice(0,4),
                        apartment_id:subData.apartment_id._id,
                        user_id:subData.user_id,
                        caterer_veg_id:subData.apartment_id.caterer_veg_id,
                        caterer_nonveg_id:subData.apartment_id.caterer_nonveg_id
                    })
                });

                Array.from({length: nvegCount}, (x,i) => {
                    var day = serverDate;

                    var nextDay = new Date(day)
                    nextDay.setDate(day.getDate()+i);
                    nextDay = nextDay.toString().slice(3,15)

                    let objIndex = finalArray.findIndex(obj => obj.selected_data == nextDay);
                    if(objIndex == -1){
                        finalArray.push({selected_data:nextDay, veg_count_on_day:0, nonVeg_count_on_day:1,
                            subscription_id:subData._id,
                            subscriber_name:'user',
                            month:nextDay.slice(0,4),
                            apartment_id:subData.apartment_id._id,
                            user_id:subData.user_id,
                            caterer_veg_id:subData.apartment_id.caterer_veg_id || null,
                            caterer_nonveg_id:subData.apartment_id.caterer_nonveg_id || null
                        })
                    }else{
                        finalArray[objIndex].nonVeg_count_on_day = 1
                    }
                })
                //console.log(finalArray,'finalArray post payment')   
                if(finalArray.length>0){
                    Calendar.insertMany(finalArray, function(err, data) {if(!err){console.log(data,'calData')}else{
                        //console.log(err)
                    }});
                }         
            })
        }
        
        let endDate = new Date()
        endDate.setFullYear(endDate.getFullYear() + 1)
        //console.log(startDate, endDate, 'dates')
        let query = {_id:payment.subscription_id._id}
        let set = {
            veg_count : fvc,
            nonveg_count: fnvc,
            totalNvegCount: ftnvc,
            totalVegCount: ftvc,
            veg_remain: frvc,
            nonveg_remain: frnvc,
            status:true,
            start_date:startDate,
            end_date:endDate
        }

        Subscription.findOneAndUpdate(query,set,{new:true}).populate('user_id apartment_id').exec((err,data)=>{
            if(err){//console.log(err)
            }else{
                //console.log(data,'sub')
                //console.log(payment, 'payment')
                //console.log(data.user_id)
                if(data.user_id.mobileno){
                    let custPhone = [data.user_id.mobileno]
                    let custMsg = `Order Placed Successfully`
                    // smsgateway.sendSMS(custPhone, custMsg);
                }
                res.send(data)
                    
            }
        })
    }})
}

exports.getMealCost = (req,res,next)=>{
    let cv = 119
    let cnv = 139
    res.send({cv:cv,cnv:cnv})
}