// db.collection.updateMany(
//    <filter>,
//    <update>,
//    {
//      upsert: <boolean>,
//      writeConcern: <document>,
//      collation: <document>,
//      arrayFilters: [ <filterdocument1>, ... ]
//    }
// )

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
    console.log(req.body,'req.bdoy')
    // Calendar.updateMany({subsubscription_id:req.bdoy.subId})
    
    res.send('asdfasd')
    // Calendar.updateMany()    
}
exports.getCal = (req, res, next) => {
    Calendar.find({subscription_id:req.params.subId}).exec((err, data)=>{if(!err){res.send(data)
    }else{res.send(err)}})
}