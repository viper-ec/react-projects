import axios from 'axios'

export const getTasksRequest = async () =>
  await axios.get('http://localhost:3500/tasks')

export const createTaskRequest = async (task) =>
  await axios.post('http://localhost:3500/tasks', task)

export const deleteTask = async (id) =>
  await axios.delete(`http://localhost:3500/tasks/${id}`)
