import { useEffect, useState } from 'react'
import { getTasksRequest } from '../api/Tasks.api.js'
import TaskCard from '../components/TaskCard.jsx'

export default function TaskPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function loadTasks() {
      const response = await getTasksRequest()
      setTasks(response.data)
    }
    loadTasks()
  }, [])

  function renderMain() {
    if (tasks.length === 0) {
      return <h2>No tasks yet</h2>
    } else {
      return tasks.map((task) => <TaskCard key={task.id} task={task} />)
    }
  }

  return (
    <div>
      <h1>Tasks</h1>
      <div>{renderMain()}</div>
    </div>
  )
}
