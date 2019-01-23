var Request = require("request");
var mongoose = require('mongoose');
var Vegmenu = require('../../../models/vegmenu');
var Nonvegmenu = require('../../../models/nonvegmenu');

exports.getMenuByDate = (req, res, next) => {
    // console.log(req.body.date, 'getMenuByDate')
    let date = new Date()
    date.setHours(5,30,0,0)

    if(req.body.date != null){
        date = new Date(req.body.date)
    }
    // console.log(date, 'date')

    let finalDate = date.toISOString().slice(0,10)
    // console.log(finalDate,'finalDate')
    let query = {today_date:finalDate}

    Vegmenu.find(query).exec(function(err,vegmeals){if(!err){
        Nonvegmenu.find(query).exec(function(err,nonvegmeals){if(!err){
            res.send({vegmeals:vegmeals,nonvegmeals:nonvegmeals})
        }else{
            res.send({vegmeals:vegmeals,nonvegmeals:[]})
        }})
    }else{
        res.send({vegmeals:vegmeals,nonvegmeals:[]})
    }})
    
};

