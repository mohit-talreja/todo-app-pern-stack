const router = require('express').Router()

const pool = require('../models/db')

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let sql = 'SELECT * FROM todos WHERE id = $1'
        let client = await pool.connect()
        const { rows } = await client.query(sql, [ id ])
        const todos = rows
        if(todos.length === 0){
            return res.status(404).json({ message: 'ToDo Not Found' })
        }
        sql = 'DELETE FROM todos WHERE id = $1'
        const { rowCount } = await client.query(sql, [ id ])
        client.release()
        res.status(200).json({ message: `${rowCount} ToDo Removed` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router