//
// Task controller
//
import { pool } from '../db.js'

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      'select id, title, description, done, createdAt from tasks order by createdAt desc',
    )
    res.json(result)
  } catch (ex) {
    return res.status(500).json({ message: ex.message })
  }
}

export const getTask = async (req, res) => {
  try {
    const [
      result,
    ] = await pool.query(
      'select id, title, description, done, createdAt from tasks where id=?',
      [req.params.id],
    )

    if (result.length === 0)
      return res.status(404).json({ message: 'Task not found' })

    res.json(result[0])
  } catch (ex) {
    return res.status(500).json({ message: ex.message })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body

    // Query
    const [
      result,
    ] = await pool.query(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description],
    )

    res.json({ id: result.insertedId, title, description })
  } catch (ex) {
    return res.status(500).json({ message: ex.message })
  }
}

// Update Task
// DELETE: /tasks/1
export const updateTask = async (req, res) => {
  try {
    const result = await pool.query('UPDATE tasks SET ? WHERE id = ?', [
      req.body,
      req.params.id,
    ])
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query('delete from tasks where id=?', [
      req.params.id,
    ])

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Task not found' })

    return res.sendStatus(204)
  } catch (ex) {
    return res.status(500).json({ message: ex.message })
  }
}
