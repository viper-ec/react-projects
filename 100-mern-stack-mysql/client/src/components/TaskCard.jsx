import { useTasks } from '../context/TaskProvider'

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks()

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done == 1 ? '✔️' : '❌'}</span>
      <span>{task.createdAt}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button>Update</button>
    </div>
  )
}
