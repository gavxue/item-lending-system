const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const timestamp = require('time-stamp')

router.get('/', (req, res) => {
    res.send('loan page')
})

router.post('/', async (req, res) => {
    const { name, email, item } = req.body

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { data, error } = await supabase
        .from('log')
        .insert({ item: item, name: name, email: email, date_loan: timestamp('YYYY-MM-DD') })
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

    res.send('Query added')
})

module.exports = router