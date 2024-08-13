const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const timestamp = require('time-stamp')

const { sendEmail } = require('../utils')

router.get('/', async (req, res, next) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { data: data_curr, error: error_curr } = await supabase
        .from('current')
        .select()
    if (error_curr) {
        console.log(error_curr)
        next(`DATABASE ERROR ${error_curr.message}.`)
        return
    }

    const ref = []
    data_curr.forEach((x) => ref.push(x.ref))

    const { data, error } = await supabase
        .from('log')
        .select()
        .in('id', ref)
        .order('id', { ascending: false })
    if (error) {
        console.log(error)
        next(`DATABASE ERROR ${error.message}.`)
        return
    }

    res.send(data)
})

router.post('/', async (req, res, next) => {
    const { id } = req.body
    const date = timestamp('YYYY-MM-DD')

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { data: data_log, error: error_log } = await supabase
        .from('log')
        .update({ date_return: date })
        .eq('id', id)
        .select()
    if (error_log) {
        console.log(error_log)
        next(`DATABASE ERROR ${error_log.message}.`)
        return
    }
    const { name, item, email } = data_log[0]

    const { error } = await supabase
        .from('current')
        .delete()
        .eq('ref', id)
    if (error) {
        console.log(error)
        next(`DATABASE ERROR ${error.message}.`)
        return
    }

    res.send({ name: name, item: item, email: email, date: date })
})

router.post('/email', async (req, res, next) => {
    const { name, item, email, date } = req.body

    try {
        await sendEmail(email, `Item returned: ${item}`, `Hello ${name},\n\nThank you for using the CEE IT Item Lending System. This email is to confirm that you returned the following item on ${date}:\n\n${item}\n\nBest,\nCEE IT`)
    } catch (err) {
        console.log(err)
        next(`EMAIL ERROR ${err.response}.`)
        return
    }

    res.send('OK')
})

module.exports = router