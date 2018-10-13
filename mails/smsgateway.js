var request = require('request');

exports.sendSMS = function (user, msg) {
    // console.log('users, msg',user, msg)
    let body = {"senderId":"JORDAN","number":user,"message":msg,"apikey":"cjixzzbgs0002y9qu1696t8yu"}
    body = JSON.stringify(body)
    request.post({
        headers: {'content-type' :  'application/json'},
        url:'https://smsapi.epadhai.in/api/v1/sendsms',
        body:body
    }, function(error, response, body){
        console.log(body);
    });
};