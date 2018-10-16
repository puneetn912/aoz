let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

// configure AWS SDK
aws.config.loadFromPath("./configs/s3_config.json");

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

exports.sendMail= function (user, [html, subject, attachments]) {
    // console.log('user.email',user.email);
  transporter.sendMail({
      from: 'hello@dialjordan.com',
      to: user.email,
      subject: subject || 'Message',
      html: html,
      attachments: attachments
  }, (err, info) => {
        console.log(err);
      console.log(info);
  });
}