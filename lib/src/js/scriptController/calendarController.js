var Request = require("request");
var mongoose = require('mongoose');
var Calendar = require('../../../models/calender');
var Subscription = require('../../../models/subscription');

exports.add = (req, res, next) => {
    //console.log(req.body,'add Cal')
    if(req.body.length>0){
        Calendar.find({subscription_id:req.body[0].subscription_id}).exec((err, data)=>{if(!err){
            //console.log(data,'data')
            if(data.length==0){
                Calendar.insertMany(req.body, function(err, data) {if(!err){res.send(data)
                }else{res.send(err)}});             
            }else{res.send('data already added')}
        }else{res.send(err)}})
    }
}
exports.update = (req, res, next) => {
    if(req.body[0].subId){
        //console.log(req.body, 'cal data update')
        Calendar.find({subscription_id:req.body[0].subId }).remove().exec((err,data)=>{
            if(err){console.log(err)}else{
                var newCal = new Calendar();
                newCal.subscription_id = req.body[0].subId ? req.body[0].subId : null;
                newCal.userId = req.body[0].userId ? req.body[0].userId : null;
                newCal.apartment_id = req.body[0].apartment_id ? req.body[0].apartment_id : null;
                newCal.selected_data = req.body[0].selected_data ? req.body[0].selected_data : null;
                newCal.save((err, data) => {
                    if (!err) {
                        //console.log(data);
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
        //console.log(obj,'obj')

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
    //console.log(req.body, 'calObj')

    // get cal data by id
    // match the vcod and nvcod 
    // get sub vr and snvr
    // add vcod to svr and nvcod to snvr
    // update sub
    // delete cal

    let query = {_id:req.params.cId}
    Calendar.findOne(query).populate('subscription_id').exec((err,data)=>{
    	//console.log(data,'cal')

    	let vcod = parseInt(data.veg_count_on_day)
    	let nvcod = parseInt(data.nonVeg_count_on_day)
    	let svr = parseInt(data.subscription_id.veg_remain)
    	let snvr = parseInt(data.subscription_id.nonveg_remain)
    	//console.log(svr,snvr, 'svr')
    	svr += vcod
    	snvr += nvcod 
    	//console.log(svr,snvr, 'svr 2')

    	let query = {_id:data.subscription_id._id}
    	let set = {
    		veg_remain: svr,
    		nonveg_remain: snvr
    	}
    	//console.log(query, set)
    	// Subscription.findOne(query).exec((err,data)=>{
    	// 	//console.log(data, 'data sub init')
    	// })
    	Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,data)=>{if(err){console.log(err)}else{
    		//console.log(data,'sub')
    		let query = {_id:req.params.cId}
    		Calendar.remove(query).exec((err,data)=>{if(err){console.log(err)}else{
    			//console.log(data,'caldeleted')
    			res.send(data)
    		}})
    	}})
    })
}

exports.updateCalOne = (req, res, next) => {
    //console.log(req.params.subId,'params')
    //console.log(req.body,'data')

    // get caldata of that date
    let body = req.body

    let query = { subscription_id:body.subscription_id, selected_data:body.selected_data }

   Calendar.findOne(query).exec((err,data)=>{
   		//console.log(data, 'cal findone')
    	
    	let query = { subscription_id:body.subscription_id, selected_data:body.selected_data }

	    let set = {            
	        subscription_id : body.subscription_id, 
	        selected_data : body.selected_data ,
	        veg_count_on_day : body.veg_count_on_day,
	        nonVeg_count_on_day : body.nonVeg_count_on_day,
	        month : body.month,
	        user_id : body.user_id,
	        apartment_id : body.apartment_id,
	        caterer_veg_id : body.caterer_veg_id,
	        caterer_nonveg_id : body.caterer_nonveg_id
	    }

	    Calendar.findOneAndUpdate(query,set,{upsert:true}).populate('subscription_id').exec((err,cal)=>{if(err){res.send(err)}else{
	        //console.log(cal,'cal findone and update')
	        res.send({updated:'ok'})

	        let cnvcd = 0, cvcd = 0,rvc = 0, rnvc = 0, diff = 0
	
	        let bvcd = parseInt(body.veg_count_on_day)
	        let bnvcd = parseInt(body.nonVeg_count_on_day)
	        
	        if(cal){
	        	cvcd = parseInt(cal.veg_count_on_day)
	        	cnvcd = parseInt(cal.nonVeg_count_on_day)
	        }

	        Subscription.findOne({_id:body.subscription_id}).exec((err,data)=>{
	        	//console.log(data,'sub')
	        	rvc = data.veg_remain
	        	rnvc = data.nonveg_remain

		        if(bvcd < cvcd){
		            diff = cvcd - bvcd
		            rvc = rvc + diff
		        }else{
		            diff = bvcd - cvcd
		            rvc = rvc - diff
		        }

		        if(bnvcd < cnvcd){
		            diff = cnvcd - bnvcd
		            rnvc = rnvc + diff
		        }else{
		            diff = bnvcd - cnvcd
		            rnvc = rnvc - diff
		        }

		        let query = {_id:req.params.subId}
		        let set = {veg_remain : rvc, nonveg_remain:rnvc}
		        Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,data)=>{
		        	//console.log(data,'sub')
		        })
	        })

	    }})
   })



    // match body veg count day and caldata veg count day

    // if body veg count day < caldata veg count day
    // then subs veg Rem - body veg count day 
    // else subsveg rem + body veg count day

    // same do for nonveg 


    // let vegRem = 5
    // let nvegRem = 5
    
    // let query = {_id:req.body.subscription_id}
    // let set = {veg_remain:vegRem, nonveg_remain:nvegRem}
    
    // Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,sub)=>{
    //     //console.log(sub, 'sub')
    //     let query = {subscription_id:req.body.subscription_id, selected_data:req.body.selected_data }
    //     let set = {            
    //         subscription_id : req.body.subscription_id, 
    //         selected_data : req.body.selected_data  ,
    //         veg_count_on_day : req.body.veg_count_on_day,
    //         nonVeg_count_on_day : req.body.nonVeg_count_on_day,
    //         month : req.body.month,
    //         user_id : req.body.user_id,
    //         apartment_id : req.body.apartment_id,
    //         caterer_veg_id : req.body.caterer_veg_id,
    //         caterer_nonveg_id : req.body.caterer_nonveg_id
    //     }

    //     Calendar.findOneAndUpdate(query, set, {new: true, upsert: true}).exec((err,data)=>{
    //         if(err){res.send(err)}else{res.send(data)}
    //     })
    // })

}
exports.pauseSub = (req,res,next) =>{
	// get all cal entries in req.body
	// get subscrption data from id
	// get remaining counts from subscription data
	// map thru cal entries in body
	// get day count
	// add to remaining counts 
	// update remaining counts and acc status in subscription 
	// if no data in body then only update acc status

    console.log(req.body.length, 'req.body')
    let vegRemAftPause = 0 
    let nvegRemAftPause = 0
    let subId = ''
    if(req.body){
        if(req.body.length>0){
            let query = {_id:req.body[0].subscription_id}
            Subscription.findOne(query).exec((err,data)=>{if(err){console.log(err)}else{
                //console.log(data,'Subscription')
                if(data.account_status == true){
                    vegRemAftPause = data.veg_remain
                    nvegRemAftPause = data.nonveg_remain

                    req.body.map((x,i)=>{
                        let vegDay = Number(x.veg_count_on_day)
                        let nvegDay = Number(x.nonVeg_count_on_day)

                        subId = x.subscription_id
                        vegRemAftPause += vegDay
                        nvegRemAftPause += nvegDay

                        if(i==req.body.length-1){
                            //console.log(vegRemAftPause,'vegRemAftPause')
                            //console.log(nvegRemAftPause,'nvegRemAftPause')
                            let query = {_id:subId}
                            let set = {$set:{veg_remain:vegRemAftPause, nonveg_remain: nvegRemAftPause, account_status: false}}
                            Subscription.findOneAndUpdate(query, set, {new:true}).exec((err, data)=>{if(err){console.log(err)}else{
                                Calendar.remove({_id:{$in:req.body}}).exec((err,data)=>{
                                    //console.log(data,'Calendar')
                                    res.send('done')
                                })
                            }})
                        }
                    })
                }else{
                    res.send('not done')
                }
            }})
        }else{
            //console.log(req.params.subId,'params')
            let query = {_id:req.params.subId}
            let set = {$set:{account_status:false}}
            Subscription.findOneAndUpdate(query,set,{new:true}).exec((err,data)=>{
                //console.log(data,'Subscription')
                res.send('done')
            })
        }
    }
}

exports.resumeSub = (req,res,next)=>{
    //console.log(req.params.id,'params')
    let query = {_id:req.params.id}
    Subscription.findOne(query).populate('apartment_id').exec((err,data)=>{if(err){console.log(err)}else{    
        //console.log(data,'Subscription')
        if(data.account_status == false){
            let finalObj = {}
            let finalArray =[]

            let launchDate = new Date("Jan 21 2019")
            launchDate.setHours(5,30,0,0)
            //console.log(launchDate, 'LAUNCH DATE SHOUD BE 17TH MIDNIGHT ')

            let serverDate = new Date()
            serverDate.setHours(serverDate.getHours() + 5)
            serverDate.setMinutes(serverDate.getMinutes() + 30)
            //console.log(serverDate, "SERVER DATE SHOULD BE 19TH MIDNIGHT")

            let borderDate = new Date()
            borderDate.setHours(20,0,0,0)
            //console.log(borderDate, 'BORDERDATE SHOULD BE 19TH , 10 AM')

            if(serverDate < launchDate){
                //console.log('REQUEST B4 LAUNCHDATE')
                serverDate = launchDate
                //console.log(serverDate, 'SERVERDATE SHOULD BE 17TH MIDNIGHT')
                borderDate = launchDate
                borderDate.setHours(20,0,0,0) 
            }

            if(serverDate > borderDate ){
                //console.log('REQUESTED AFTER 10 TODAY')
                serverDate.setDate(serverDate.getDate() + 1)
                //console.log(serverDate, 'SERVERDATE SHOULD BE 20TH AFTERNOON') 
            }else{
                //console.log(serverDate, 'SERVERDATE SHOULD BE 19TH PAST MIDNIGHT') 
            }

            let vegCount = data.veg_remain
            let nvegCount = data.nonveg_remain

            Array.from({length: vegCount}, (x,i) => {
                var day = serverDate;

                var nextDay = new Date(day)
                nextDay.setDate(day.getDate()+i);
                nextDay = nextDay.toString().slice(3,15)

                finalArray.push({selected_data:nextDay, veg_count_on_day:1, nonVeg_count_on_day:0, 
                    subscription_id:data._id,
                    subscriber_name:'user',
                    month:nextDay.slice(0,4),
                    apartment_id:data.apartment_id._id,
                    user_id:data.user_id,
                    caterer_veg_id:data.apartment_id.caterer_veg_id,
                    caterer_nonveg_id:data.apartment_id.caterer_nonveg_id
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
                        subscription_id:data._id,
                        subscriber_name:'user',
                        month:nextDay.slice(0,4),
                        apartment_id:data.apartment_id._id,
                        user_id:data.user_id,
                        caterer_veg_id:data.apartment_id.caterer_veg_id || null,
                        caterer_nonveg_id:data.apartment_id.caterer_nonveg_id || null
                    })
                }else{
                    finalArray[objIndex].nonVeg_count_on_day = 1
                }
            })
            //console.log(finalArray,'finalArray')
            
            let query = {_id:req.params.id}
            let set = {account_status:true,veg_remain:0,nonveg_remain:0}
            let param = {new:true}
            Subscription.findOneAndUpdate(query,set,param).exec((err,data)=>{if(err || !data){console.log(err);res.sendStatus(403)}else{
                //console.log(data,'Subscription updated')
                if(finalArray.length>0){
                    Calendar.insertMany(finalArray, function(err, data) {if(!err){console.log(data)}else{
                        console.log(err)
                    }});
                }
                res.send(data)
            }})
        }else{
            res.send(data)
        }
        // sub status update
        // if finalArray is not empty
        // cal update
        // else dont update cal 
        // send sub

    }})
}