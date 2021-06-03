const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

var port = 3000
var app = express()

app.use(bodyParser.json({type:'application/json'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({ origin: "http://localhost:19006", credentials: true}))

var conn = mysql.createConnection({
    host: 'localhost',
    password: 'CHANGE_IT',
    user: 'CHANGE_IT',
    database: 'quiz_users'
})

app.get('/', (req, res) => {
    res.redirect('/list')
})

app.get('/list', (req, res) => {
    conn.query('SELECT * FROM users;', (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log('SUCCESS')
            res.status(200).send(result)
        }
        else {
            res.status(404).send('E')
        }
    })
})

app.get('/user/:id', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    let number = /^[0-9]+$/

    if (!number.test(id)) {
        res.status(400).send('E')
    } else {
        let query = `SELECT * from users where id = ${id};`;
        conn.query(query, (err, result) => {
            if (err) {
                res.status(400).send('E')
                throw(err)
            } 
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(400).send('E')
            }
        })
    }
})

app.post('/add', (req, res) => {
    let {name, surname, age} = req.body
    let alpha = /^[a-zA-z]{3,}/
    let number = /^[0-9]{1,2}/

    if (!alpha.test(name) || !alpha.test(surname) || !number.test(age)) {
        res.status(400).send('E')
    } else {
        console.log(`${name} ${surname} ${age}`)
        let query = `INSERT INTO users(name, surname, age) VALUES("${name}", "${surname}", ${age});`
        conn.query(query, (err, result) => {
            if (err) {
                res.status(400).send('E')
                throw err;
            } else {
                res.status(200).send('S')
            }
        }) 
    }
})

app.delete('/user/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    let number = /^[0-9]+$/

    if (!number.test(id)) {
        console.log('Wrong req')
        res.status(400).send('E')
    } else {
        let query = `DELETE FROM users WHERE id = ${id};`
        conn.query(query, (err, result) => {
            if (err) {
                res.status(400).send('')
                throw err;
            }
            res.status(200).send('')
        })
    }
})
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
