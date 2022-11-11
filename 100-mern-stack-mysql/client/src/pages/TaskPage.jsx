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
      <h1 className="text-5xl text-white text-center font-bold my-3">Tasks</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  )
}
