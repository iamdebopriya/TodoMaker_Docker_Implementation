// todo-docker/todo-backend/server.js

import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import dotenv from 'dotenv'
import path from 'path'

// Load .env from project root
dotenv.config({ path: path.resolve('../../.env') })

const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json())

// Postgres Pool using only env variables
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT, 10)
})

// Initialize DB and create todos table if not exists
async function initDB(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS todos (
          id SERIAL PRIMARY KEY,
          text TEXT NOT NULL,
          done BOOLEAN DEFAULT false
        )
      `)
      console.log('Database is ready!')
      return
    } catch (err) {
      console.log(`Database not ready, retrying... (${i + 1})`)
      await new Promise(res => setTimeout(res, 5000)) 
    }
  }
  console.error('Failed to connect to database after several retries')
  process.exit(1)
}

initDB()

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database query failed' })
  }
})

// Create a new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO todos (text, done) VALUES ($1, false) RETURNING *',
      [text]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create todo' })
  }
})

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { done, text } = req.body
  try {
    const result = await pool.query(
      'UPDATE todos SET text=$1, done=$2 WHERE id=$3 RETURNING *',
      [text, done, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update todo' })
  }
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM todos WHERE id=$1', [id])
    res.json({ message: 'deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete todo' })
  }
})

// Start server
app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000')
})