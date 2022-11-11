import axios from 'axios'

const baseUrl = 'http://localhost:3500/tasks'

export const getTasksRequest = async () => await axios.get(baseUrl)

export const getTaskByIdRequest = async (id) =>
  await axios.get(`${baseUrl}/${id}`)

export const createTaskRequest = async (task) => await axios.post(baseUrl, task)

export const updateTaskRequest = async (id, task) =>
  await axios.put(`${baseUrl}/${id}`, task)

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`${baseUrl}/${id}`, { done })

export const deleteTaskRequest = async (id) =>
  await axios.delete(`${baseUrl}/${id}`)
