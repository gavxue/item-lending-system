const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const loan = require('./routes/loan')
const returnItem = require('./routes/return')
const admin = require('./routes/admin')

const app = express()

app.use('/loan', loan)
app.use('/return', returnItem)
app.use('/admin', admin)

app.get('/', (req, res) => {
    let db = new sqlite3.Database('./db/item-loan.db')

    db.all('SELECT * FROM log', [], (err, rows) => {
        if (err) {
            console.log(err.message)
        }
        rows.forEach((row) => {
            console.log(row)
        })
    })

    db.close()

    res.send('hello world')
})

app.listen('3000', () => {
    console.log('Listening on port 3000')
})
