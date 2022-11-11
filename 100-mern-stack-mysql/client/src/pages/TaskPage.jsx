import { useEffect } from 'react'
import { useTasks } from '../context/TaskProvider'
import TaskCard from '../components/TaskCard.jsx'

export default function TaskPage() {
  const { tasks, getTasks } = useTasks()

  useEffect(() => {
    getTasks()
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
