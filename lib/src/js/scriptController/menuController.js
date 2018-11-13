var Request = require("request");
var mongoose = require('mongoose');
var Vegmenu = require('../../../models/vegmenu');
var Nonvegmenu = require('../../../models/nonvegmenu');

exports.getMenu = (req, res, next) => {
let today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate()+1);
let dd = tomorrow.getDate();
let mm = tomorrow.getMonth()+1;
let yy = tomorrow.getFullYear();

if(mm<10)
{
    mm = '0'+mm;
}

if(dd<10){
    dd = '0'+dd;
}

let todaydate = yy+'-'+mm+'-'+dd
    console.log('i am in shyam')
    Vegmenu.find({today_date:todaydate}).exec(function(err,vegmeals)
    {
        if(!err)
        {
            console.log('vegmeals',vegmeals)
            Nonvegmenu.find({today_date:todaydate}).exec(function(err,nonvegmeals)
            {
                if(!err)
                {
                    console.log('nonvegmeals nonvegmeals',nonvegmeals)
                    res.send({vegmeals:vegmeals,nonvegmeals:nonvegmeals})
                }
                else
                {
                    console.log('err nonveg',err)
                    res.send({vegmeals:vegmeals,nonvegmeals:[]})

                }
            })
        }
        else
        {
            console.log('err vegmeals',err)
            res.send({vegmeals:[],nonvegmeals:[]})

        }
    })
};
