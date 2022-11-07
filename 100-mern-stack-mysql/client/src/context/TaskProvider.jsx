import { useContext, useState } from 'react'
import {
  getTasksRequest,
  createTaskRequest,
  deleteTaskRequest,
} from '../api/Tasks.api.js'
import { TaskContxt } from './TaskContext.jsx'

export const useTasks = () => {
  const context = useContext(TaskContxt)
  if (!context) {
    throw new Error('useTasks must used within a TaskContxtProvider')
  }
  return context
}

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  async function getTasks() {
    const response = await getTasksRequest()
    setTasks(response.data)
  }

  async function createTask(task) {
    try {
      const response = await createTaskRequest(task)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteTask(id) {
    try {
      const response = await deleteTaskRequest(id)
      setTasks(tasks.filter((task) => task.id !== id))
      //console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TaskContxt.Provider
      value={{ tasks, loadTasks: getTasks, createTask, deleteTask }}
    >
      {children}
    </TaskContxt.Provider>
  )
}
