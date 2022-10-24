import { useState } from 'react'
import './TodoApp.css'

export default function Todo({ todoItem, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false)

  function FormEdit() {
    const [newValue, setNewValue] = useState(todoItem.title)

    function handleSubmit(e) {
      e.preventDefault()
    }

    function handleChange(e) {
      const value = e.target.value
      setNewValue(value)
    }

    // Update
    function handleClickUpdate() {
      /*   console.log('Event: handleClickUpdate')
      console.log('todoItem: ')
      console.log(todoItem)
      console.log('newValue: ')
      console.log(newValue)
     */
      onUpdate(todoItem.id, newValue)
      setIsEdit(false)
    }

    return (
      <form className="todoUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoInput"
          onChange={handleChange}
          value={newValue}
        />
        <button className="button" onClick={handleClickUpdate}>
          Update
        </button>
      </form>
    )
  }

  function TodoElement() {
    function handleClickEdit() {
      // console.log('Event: handleClickEdit')
      setIsEdit(true)
    }

    // Delete
    function handleDelete() {
      onDelete(todoItem.id)
    }

    return (
      <div className="todoInfo">
        <span className="todoTitle">{todoItem.title}</span>
        <button className="button" onClick={handleClickEdit}>
          Edit
        </button>
        <button className="buttonDelete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    )
  }

  // Return
  return <div className="todo">{isEdit ? <FormEdit /> : <TodoElement />}</div>
}
