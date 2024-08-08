const express = require('express')
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()

router.get('/', (req, res) => {
    res.send('loan page')
})

router.post('/', (req, res) => {
    let db = new sqlite3.Database('./db/item-loan.db')

    db.run("INSERT INTO log VALUES (1, 'test', 'Tom', 'tom@gmail.com', 'today', 'n/a');", [], (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log('row added')
    })

    db.close()

    res.send('Query added')
})

module.exports = router