import { deleteTask } from '../api/Tasks.api.js'

export default function TaskCard({ task }) {
  async function handleDelete(id) {
    try {
      const response = await deleteTask(id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.done == 1 ? '✔️' : '❌'}</span>
      <span>{task.createdAt}</span>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
      <button>Update</button>
    </div>
  )
}
