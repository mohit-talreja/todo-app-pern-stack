const router = require('express').Router()

const pool = require('../models/db')

router.post('/', async (req, res) => {
    try {
        const { title, description, date } = req.body
        let sql = 'SELECT * FROM todos WHERE title = $1'
        let client = await pool.connect()
        const { rows } = await client.query(sql, [ title ])
        const todos = rows
        if(todos.length > 0){
            return res.status(200).json({ message: 'ToDo Already Exists' })
        }
        sql = 'INSERT INTO todos (id,title,description,date) VALUES (DEFAULT,$1,$2,$3)'
        const { rowCount } = await client.query(sql, [ title, description, date ])
        client.release()
        res.status(201).json({ message: `${rowCount} ToDo Created.` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router