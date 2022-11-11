import { useTasks } from '../context/TaskProvider'
import { useNavigate } from 'react-router-dom'

export default function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks()
  const navigate = useNavigate()

  async function handleClickDone() {
    await toggleTaskDone(task.id)
  }

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done == 1 ? '✅' : '❌'}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span className="text-xs">{task.createdAt}</span>
      <div className="flex gap-x-1">
        <button
          className="bg-red-500 px-2 py-1"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-500 px-2 py-1"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500 px-2 py-1"
          onClick={() => handleClickDone()}
        >
          Toogle Task
        </button>
      </div>
    </div>
  )
}
