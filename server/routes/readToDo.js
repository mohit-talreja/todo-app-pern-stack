const router = require('express').Router()

const pool = require('../models/db')

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const sql = 'SELECT * FROM todos WHERE id = $1'
        const client = await pool.connect()
        const { rows } = await client.query(sql, [ id ])
        client.release()
        const [ todo ] = rows
        if(!todo){
            return res.status(404).json({ message: 'ToDo Not Found' })
        }
        res.status(200).json({ todo })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router