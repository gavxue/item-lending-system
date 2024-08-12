const nodemailer = require('nodemailer')

function sendEmail(email, subject, body) {
    const transporter = nodemailer.createTransport({
        host: "mailservices.uwaterloo.ca",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: 'ceecoop1@uwaterloo.ca',
        to: email,
        subject: subject,
        text: body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info.response)
        }
    })
}

module.exports = { sendEmail }