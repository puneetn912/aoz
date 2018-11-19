var Request = require("request");
var mongoose = require('mongoose');
var Vegmenu = require('../../../models/vegmenu');
var Nonvegmenu = require('../../../models/nonvegmenu');

exports.getMenuByDate = (req, res, next) => {
    console.log(req.body, 'getMenuByDate')
    let date = new Date()
    if(req.body.date != null){
        date = new Date(req.body.date)
    }
    console.log(date,'date')
    if(date.getMonth()<10){
        date.getMonth() = '0'+date.getMonth();
    }
    if(date.getDate()<10){
        date.getDate() = '0'+date.getDate();
    }

    let finalDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    console.log(finalDate,'finalDate')
    let query = {today_date:finalDate}

    Vegmenu.find(query).exec(function(err,vegmeals){if(!err){
        console.log(vegmeals)
        Nonvegmenu.find(query).exec(function(err,nonvegmeals){if(!err){
            res.send({vegmeals:vegmeals,nonvegmeals:nonvegmeals})
        }else{
            res.send({vegmeals:vegmeals,nonvegmeals:[]})
        }})
    }else{
        res.send({vegmeals:vegmeals,nonvegmeals:[]})
    }})
    
};

