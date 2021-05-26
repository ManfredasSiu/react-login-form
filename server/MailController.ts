var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'monfislt@gmail.com',
    pass: 'DelSaugumoBeSlaptazodzio'
  }
});

var mailOptions = {
  from: 'monfislt@gmail.com',
  to: 'manfredas.siurkus@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const sendResetMail = (email, token, purpose) => {
    
    mailOptions = {
        ...mailOptions,
        to: email,
        subject: "Nustatyti nauja slaptazodi",
        text: `Sveiki, nauja slaptazodi galite nustatyti pasinaudoje sia nuoroda http://localhost:3000/reset?token=${token}&email=${email}&purpose=${purpose}`
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
    }
})};

const sendMail = (email, mailText, subject) => {
    mailOptions = {
        ...mailOptions,
        to: email,
        subject: subject,
        text: mailText
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
})};

module.exports = {
    sendResetMail,
    sendMail
}