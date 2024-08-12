const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const timestamp = require('time-stamp')

const { sendEmail } = require('../utils')

router.get('/', async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const res_curr = await supabase
        .from('current')
        .select()
    if (res_curr.error) console.log(res_curr.error)

    const ref = []
    res_curr.data.forEach((x) => ref.push(x.ref))

    const { data, error } = await supabase
        .from('log')
        .select()
        .in('id', ref)
        .order('id', { ascending: false })
    if (error) console.log(error)

    res.send(data)
})

router.post('/', async (req, res) => {
    const { id } = req.body
    const date = timestamp('YYYY-MM-DD')

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const res_log = await supabase
        .from('log')
        .update({ date_return: date })
        .eq('id', id)
        .select()
    if (res_log.error) console.log(res_log.error)
    const { name, item, email } = res_log.data[0]

    const { error } = await supabase
        .from('current')
        .delete()
        .eq('ref', id)
    if (error) console.log(error)

    sendEmail(email, `Item returned: ${item}`, `Hello ${name},\n\nThank you for using the CEE IT Item Lending System. This email is to confirm that you returned the following item on ${date}:\n\n${item}\n\nBest,\nCEE IT`)

    res.send('ok')
})

module.exports = router