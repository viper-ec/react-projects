import { useTasks } from '../context/TaskProvider'
import { useNavigate } from 'react-router-dom'

export default function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks()
  const navigate = useNavigate()

  async function handleClickDone() {
    await toggleTaskDone(task.id)
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done == 1 ? '✔️' : '❌'}</span>
      <span>{task.createdAt}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
      <button onClick={() => handleClickDone()}>Toogle Task</button>
    </div>
  )
}
