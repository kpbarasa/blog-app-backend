const nodemailer = require("nodemailer");

const sendEmail = (UserEmaillAddress, subject, link, emailType, token) => {

 
    var EmailText = ""
  
    if (emailType === "recovery") {
      subject = subject
      EmailText = 'Reset password link '+link+' link active for 5 min'
    }
  
    else if (emailType === "authentication") {
      subject = subject
      EmailText = 'Reset password link '+link+' link active for 5 min'
    }
  
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'kpbarasa@gmail.com',
        pass: 'gvvmuddzawrgeprg',
        clientId: "1027490353182-or0ta0i4qtbjq9vles195u86sg9i4m2k.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04M6QbGYH-4bKCgYIARAAGAQSNwF-L9IrrHELqT_WhZBcBsEKXFP7xgxTutrVEYQhkh391WrxHQAUjYGjDX1LfkA58Wh7WV1o-DA"
      }
    });
  
    var mailOptions = {
      from: 'kpbarasa@gmail.com',
      to: UserEmaillAddress,
      subject: subject,
      text: EmailText
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
  
        console.log(error);
  
      }
      else {
  
        res.cookie('temp_token', token, { signed: true, maxAge: (1000 * 60 * 100) });
  
        res.cookie('tempmail', req.body.user_email, { signed: true, maxAge: (1000 * 60 * 100) });
        console.log('Email sent, check email address ' + req.body.user_email );
  
  
      }
    });
  
  }

module.exports = sendEmail;