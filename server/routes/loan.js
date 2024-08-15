const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const timestamp = require('time-stamp')

const { sendEmail } = require('../utils')

router.post('/', async (req, res, next) => {
    const { name, email, item } = req.body
    const date = timestamp('YYYY-MM-DD')

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { error } = await supabase
        .from('log')
        .insert({ item: item, name: name, email: email, date_loan: date })
    if (error) {
        console.log(error)
        next(`DATABASE ERROR ${error.message}.`)
        return
    }

    res.send({ name: name, email: email, item: item, date: date })
})

router.post('/email', async (req, res, next) => {
    const { name, item, email, date } = req.body

    try {
        await sendEmail(email, `Item loaned: ${item}`, `Hello ${name},\n\nThank you for using the CEE IT Item Lending System. This email is to confirm that you signed out the following item on ${date}:\n\n${item}\n\nPlease return the item as soon you are done using it. Thank you.\n\nBest,\nCEE IT`)
    } catch (err) {
        console.log(err)
        next(`EMAIL ERROR ${err.response}.`)
        return
    }

    res.send('OK')
})

module.exports = router