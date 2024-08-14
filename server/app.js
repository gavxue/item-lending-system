const express = require('express')
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

app.get('/', (req, res) => {
    res.send('pinged')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
