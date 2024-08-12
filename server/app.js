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

app.listen('3000', () => {
    console.log('Listening on port 3000')
})
