let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// configure AWS SDK
aws.config.loadFromPath("./configs/s3_config.json");

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({ apiVersion: '2010-12-01' })
});

exports.sendMail= function (user, [html, subject, attachments]) {
    transporter.sendMail({
        from: 'info@djfresh.in',
        to: user.email,
        subject: subject || 'DJfresh Update',
        html: html,
        attachments: attachments
    }, (err, info) => {if(err){ console.log(err,'err') }else{ console.log(info,'info') }
  });
}