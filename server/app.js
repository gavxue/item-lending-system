const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const loan = require('./routes/loan')
const returnItem = require('./routes/return')
const admin = require('./routes/admin')

const app = express()

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/loan', loan)
app.use('/return', returnItem)
app.use('/admin', admin)

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.get('/', async (req, res) => {
    // const { data, error } = await supabase
    //     .from('log')
    //     .insert({item: 'darwg', name: 'test', email: 'feawntr', date_loan: '2024-08-08 14:23:35', date_return: '2024-08-08 14:23:35'})
    //     .select()
    // if (error) {
    //     console.log(error)
    // }
    // console.log(data)
    res.json({ message: 'hello world' })
})

app.listen('3000', () => {
    console.log('Listening on port 3000')
})
