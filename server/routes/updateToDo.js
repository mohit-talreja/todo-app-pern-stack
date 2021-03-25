const router = require('express').Router()

const pool = require('../models/db')

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body
        let sql = 'SELECT * FROM todos WHERE id = $1'
        let client = await pool.connect()
        const { rows } = await client.query(sql, [ id ])
        const todos = rows
        if(todos.length === 0){
            return res.status(404).json({ message: 'ToDo Not Found' })
        }
        sql = 'UPDATE todos SET title = $1, description = $2 WHERE id = $3'
        const { rowCount } = await client.query(sql, [ title, description, id ])
        client.release()
        res.status(200).json({ message: `${rowCount} ToDo Updated` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router