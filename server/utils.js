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
        from: `${process.env.EMAIL_USER}@uwaterloo.ca`,
        to: email,
        replyTo: 'civrt@uwaterloo.ca',
        subject: subject,
        text: body
    }

    return transporter.sendMail(mailOptions)

}

module.exports = { sendEmail }