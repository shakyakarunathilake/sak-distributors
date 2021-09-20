const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        type: "login",
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
})

exports.notifyCreateEmployee = (data) => {
    const mailOptions = {
        from: process.env.MAIL_ADDRESS,
        to: data.email,
        subject: "Welcome to SAK Distributors",
        text: `Dear ${data.firstname} ${data.lastname}, 
        You are successfully registered to the system as a ${data.designation}. Please keep confidential below mentioned credentials of your account. 
         
        Username :  ${data.username} 
        Password: ${data.password}
        
        Please change your password once you log in for the first time.
        
        Best Regards,
        Admin,
        SAK Distributor`
    };

    transporter.sendMail({ mailOptions }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent:" + info);
        };
    });
}
