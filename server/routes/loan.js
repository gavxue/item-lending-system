const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const timestamp = require('time-stamp')

const { sendEmail } = require('../utils')

router.post('/', async (req, res) => {
    const { name, email, item } = req.body
    const date = timestamp('YYYY-MM-DD')

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { data, error } = await supabase
        .from('log')
        .insert({ item: item, name: name, email: email, date_loan: date })
        .select()
    if (error) {
        console.log(error)
    }

    const { data1, error1 } = await supabase
        .from('current')
        .insert({ ref: data[0].id })
        .select()
    if (error1) {
        console.log(error1)
    }
    // console.log(data1)

    sendEmail(email, `Item loaned: ${item}`, `Hello ${name},\n\nThank you for using the CEE IT Item Lending System. This email is to confirm that you signed out the following item on ${date}:\n\n${item}\n\nPlease return the item as soon you are done using it. Thank you.\n\nBest,\nCEE IT`)

    // const transporter = nodemailer.createTransport({
    //     host: "mailservices.uwaterloo.ca",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // })

    // const mailOptions = {
    //     from: 'ceecoop1@uwaterloo.ca',
    //     to: 'g3xue@uwaterloo.ca',
    //     subject: 'Test email',
    //     text: 'efawioiorbanoiubraw'
    // }

    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(info.response)
    //     }
    // })

    res.send('Query added')
})

module.exports = router