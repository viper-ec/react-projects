import { useState } from 'react'
import Todo from './Todo'
import './TodoApp.css'

export default function TodoApp() {
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState([])

  function handleTitleChange(e) {
    // console.log('event: handleTitleChange')
    let value = e.target.value
    setTitle(value)
  }

  function handleSubmit(e) {
    // Prevenir acción por defecto "submit"
    e.preventDefault()
    // console.log('event: handleTitleChange')

    // Nuevo objeto todo
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    }

    // Añadir nuevo objeto al arreglo, usando variable temporal
    const temp = [...todos]

    // Añadir nuevo objeto "todo" al inicio del arreglo
    temp.unshift(newTodo)

    // Actualizar todos
    setTodos(temp)

    // Encerar title
    setTitle('')
    // console.log(todos)
  }

  function handleUpdate(id, value) {
    // console.log('event: handleUpdate')
    // console.log('id: ' + id + '; value: ' + value)

    const temp = [...todos]
    /* 
    console.log('todos:')
    console.log(todos)
    console.log('temp:')
    console.log(temp)
 */
    // Find item to update
    const item = temp.find((item) => item.id === id)

    if (item) {
      // console.log('item found: ')
      // console.log(item)

      item.title = value
      setTodos(temp)
    }
  }

  function handleDelete(id) {
    // console.log('event: handleDelete')
    // console.log('id: ' + id)

    // Find filter to delete
    const temp = todos.filter((item) => item.id !== id)
    setTodos(temp)
  }

  return (
    <div className="todoContainer">
      <h1>Todo App</h1>
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input
          className="todoInput"
          onChange={handleTitleChange}
          value={title}
        />
        <button type="submit" className="buttonCreate">
          Create todo
        </button>
      </form>
      <div className="todosContainer">
        {todos.map((item) => (
          <Todo
            key={item.id}
            todoItem={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
