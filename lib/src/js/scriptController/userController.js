var Request = require("request");
var mongoose = require('mongoose');
var User = require('../../../models/user');

//save single Subscription
exports.createUser = (req, res, next) => {
    console.log(req.body, 'createUser')
    User.findOne({mobileno:req.body.phone}).exec((err, data) => { if(!err){
            if(data){
                res.send(data)
            }else{
                console.log('else')
                var newUser = new User();
                newUser.name = null
                newUser.email = null
                newUser.mobileno = req.body.phone
                newUser.caterer_id = null
                newUser.caterer_name = null
                newUser.apartment_id = null
                newUser.apartment_name = null
                newUser.tower_name = null
                newUser.door_no = null
                newUser.save((err, user) => { if (!err) {
                    res.send(user);
                } else { console.log('sub error',err) } });
            }
    }else{res.send(err) }})
};

exports.updateUser = (req, res, next) => {
    console.log(req.body, 'req.body')
    User.findOne({_id: req.body.userId}).exec((err, user) => { if (!err) {
        console.log(user,'user')
        user.mobileno = req.body.mobileno ? req.body.mobileno : user.mobileno;
        user.apartment_id = req.body.apartment_id  ? req.body.apartment_id : user.apartment_id;
        user.apartment_name = req.body.apartment_name  ? req.body.apartment_name : user.apartment_name;
        user.tower_name = req.body.tower_name  ? req.body.tower_name : user.tower_name;
        user.door_no = req.body.door_no  ? req.body.door_no : user.door_no;
        user.name = req.body.name  ? req.body.name : user.name;
        user.email = req.body.email  ? req.body.email : user.email;
        user.caterer_id = req.body.caterer_id ? req.body.caterer_id : user.caterer_id;
        user.caterer_name = req.body.caterer_name ? req.body.caterer_name : user.caterer_name;
        
        user.save((err, data) => {if (!err) {res.send(data)}
        else{res.send(err)}})
    }})

    // console.log(req.body,'req.body')
    // let id = {_id:req.body.userId}
    // let set = {$set:{ apartment_id:req.body.apartment.id, apartment_name:req.body.apartment.name, tower_name:req.body.tower}}
    
    // User.findOneAndUpdate(id,set,{new:true}).exec((err, data)=>{if(!err){res.send(data)
    // }else{ res.send(err) }})
};

exports.checkUser = (req, res, next) => {
    console.log(req.params.phone,'req.body')
    let query = {mobileno:req.params.phone}
    
    User.find(query).exec((err, data)=>{if(!err){res.send(data)
    }else{ res.send(err) }})
};

exports.checkUserId = (req, res, next) => {
    console.log(req.params.id,'req.body')
    let query = {_id:req.params.id}
    
    User.findOne(query).exec((err, data)=>{if(!err){res.send(data)
    }else{ res.send(err) }})
};

exports.getUserById = (req, res, next) => {
    console.log(req.params.id,'req.body')
    let query = {_id:req.params.id}
    
    User.findOne(query).exec((err, data)=>{if(!err){res.send(data)
    }else{ res.send(err) }})
};