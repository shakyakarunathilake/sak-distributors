require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
    },
});

transporter.verify().then(console.log).catch(console.error);

exports.sendEmail = (req) => {

    const mailoptions = {
        from: process.env.MAIL_ADDRESS,
        to: req.tomail,
        subject: req.subject,
        text: req.content
    };

    transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            console.log("error:" + error);
        } else {
            console.log("Email Sent:" + info);
            res.status(200).json({
                type: "success",
                message: ``
            })
        };
    });

}
