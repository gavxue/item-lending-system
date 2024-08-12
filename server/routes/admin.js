const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const timestamp = require('time-stamp')

router.get('/', async (req, res) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    // const res_curr = await supabase
    //     .from('current')
    //     .select()
    // if (res_curr.error) console.log(res_curr.error)

    // const ref = []
    // res_curr.data.forEach((x) => ref.push(x.ref))

    const { data, error } = await supabase
        .from('log')
        .select()
        .order('id', { ascending: false })
    if (error) console.log(error)

    res.send(data)
})

module.exports = router