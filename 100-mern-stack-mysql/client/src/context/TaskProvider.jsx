import { useContext, useState } from 'react'
import {
  getTasksRequest,
  getTaskByIdRequest,
  createTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
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

  // Get all tasks
  async function getTasks() {
    console.log('Get all tasks')

    const response = await getTasksRequest()
    setTasks(response.data)
  }

  // Get task by id
  async function getTaskById(id) {
    console.log('Get task => ', id)

    try {
      const response = await getTaskByIdRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  // Create task
  async function createTask(task) {
    console.log('Create => ', task)

    try {
      const response = await createTaskRequest(task)
      //console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  // Update task
  async function updateTask(id, task) {
    console.log('Update => ', id, task)

    try {
      const response = await updateTaskRequest(id, task)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // Toolge task
  async function toggleTaskDone(id) {
    console.log('Toggle done => ', id)

    try {
      const taskInDb = tasks.find((t) => t.id === id)
      await toggleTaskDoneRequest(id, taskInDb.done === 0 ? true : false)
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task,
        ),
      )
    } catch (error) {
      console.log(error)
    }
  }

  // Delete task by id
  async function deleteTask(id) {
    console.log('Delete => ', id)

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
      value={{
        tasks,
        getTasks,
        getTaskById,
        createTask,
        updateTask,
        toggleTaskDone,
        deleteTask,
      }}
    >
      {children}
    </TaskContxt.Provider>
  )
}
