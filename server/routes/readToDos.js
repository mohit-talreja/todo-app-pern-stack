const router = require('express').Router()

const pool = require('../models/db')

router.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM todos'
        const client = await pool.connect()
        const { rows } = await client.query(sql)
        client.release()
        const todos = rows
        res.status(200).json({ todos })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router