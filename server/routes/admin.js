const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    
    // let db = new sqlite3.Database('./db/item-loan.db')

    // db.all('SELECT * FROM log', [], (err, rows) => {
    //     if (err) {
    //         console.log(err.message)
    //     }
    //     rows.forEach((row) => {
    //         console.log(row)
    //     })
    // })

    // db.close()

    // res.send('admin page')
})

module.exports = router