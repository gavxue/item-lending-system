const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')

const { sendEmail } = require('../utils')

router.get('/', async (req, res, next) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { data, error } = await supabase
        .from('log')
        .select()
        .order('id', { ascending: false })
    if (error) {
        console.log(error)
        next(`DATABASE ERROR ${error.message}.`)
        return
    }

    res.send(data)
})

router.post('/', async (req, res, next) => {
    const { name, email, item, date_loan } = req.body

    try {
        await sendEmail(email, `Item reminder: ${item}`, `Hello ${name},\n\nThis email is to remind you that according to our records, you still have the following item checked out from ${date_loan}:\n\n${item}\n\nIf you have already returned the item, submit a request through our help portal and we will correct our records promptly. Otherwise, please return the item at your earliest convenience. Thank you.\n\nBest,\nCEE IT`)
    } catch (err) {
        console.log(err)
        next(`EMAIL ERROR ${err.response}.`)
        return
    }

    res.send('OK')
})

module.exports = router