const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const loan = require('./routes/loan')
const returnItem = require('./routes/return')
const admin = require('./routes/admin')

const app = express()

app.use('/loan', loan)
app.use('/return', returnItem)
app.use('/admin', admin)

// let db = new sqlite3.Database('./db/item-loan.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('Connected to database')
// })

// db.all('select * from log', [], (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     rows.forEach((row) => {
//         console.log(row)
//     })
// })

// db.serialize(() => {
//     db.each(`SELECT PlaylistId as id,
//                     Name as name
//              FROM playlists`, (err, row) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log(row.id + "\t" + row.name);
//     });
//   });

// db.close((err) => {
//     if (err) {
//         console.log(err.message)
//     }
//     console.log('Closed database connection')
// })

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen('3000', () => {
    console.log('Listening on port 3000')
})
