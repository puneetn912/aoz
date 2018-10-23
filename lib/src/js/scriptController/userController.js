var Request = require("request");
var mongoose = require('mongoose');
var User = require('../../../models/user');


//save single Subscription
exports.createUser = (req, res, next) => {
    console.log(req.body,'req.body')

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
};

exports.updateUser = (req, res, next) => {
    console.log(req.body,'req.body')
    User.findOneAndUpdate({_id:req.body.userId},{$set:{ apartment_id:req.body.apartment.id, 
                                                        apartment_name:req.body.apartment.name,
                                                        tower_name:req.body.tower}},{new:true}).exec((err, data)=>{if(!err){
                                                            res.send(data)
                                                        }else{ res.send(err) }})
    // newUser.name = null
    // newUser.email = null
    // newUser.mobileno = req.body.phone
    // newUser.caterer_id = null
    // newUser.caterer_name = null
    // newUser.apartment_id = null
    // newUser.apartment_name = null
    // newUser.tower_name = null
    // newUser.door_no = null

};