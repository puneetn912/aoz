const path = require("path");
var pug = require("pug");
var nodemailer = require("../../../../mails/nodemailer.js");
const publicPath = path.resolve(__dirname, "../../../../public/templates/emails/");

console.log(nodemailer,'nodemailer')
console.log(publicPath,'publicPath')

exports.test = (req, res, next) => {
    let merchant = {email:'support@djfresh.in'}
    const mercResPath = path.join(publicPath, "sample.pug")
    let htmlM = pug.renderFile(mercResPath, {user: 'abc', enquiry: 'test'})
    nodemailer.sendMail(merchant, [htmlM]);
};

exports.caterer = (req, res, next) => {
    let merchant = {email:'support@djfresh.in'}
    const mercResPath = path.join(publicPath, "sample.pug")
    let htmlM = pug.renderFile(mercResPath, {user: 'abc', enquiry: 'test'})
    nodemailer.sendMail(merchant, [htmlM]);
};

exports.user = (req, res, next) => {
    let merchant = {email:'support@djfresh.in'}
    const path = path.join(publicPath, "user.pug")
    let html = pug.renderFile(path, {user: 'abc', enquiry: 'test'})
    nodemailer.sendMail(merchant, [htmlM]);
};
