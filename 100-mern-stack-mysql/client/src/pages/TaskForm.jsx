import { Form, Formik, Field } from 'formik'
import { useTasks } from '../context/TaskProvider'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function TaskForm() {
  const { createTask, getTaskById, updateTask } = useTasks()

  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        const task = await getTaskById(params.id)
        //console.log(task)
        setTask({ title: task.title, description: task.description })
      }
    }

    console.log('loading data...')
    fetchData()
  }, [])
  //console.log(params)

  return (
    <div>
      <h2>{params.id ? 'Edit Task' : 'New Task'}</h2>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (!params.id) {
            await createTask(values)
            actions.resetForm()
          } else {
            await updateTask(params.id, values)
            navigate('/')
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <Field
                name="title"
                placeholder="Write a title"
                onChange={handleChange}
                value={values.title}
              />
            </div>

            <div>
              <label>Description</label>
              <Field
                as="textarea"
                name="description"
                rows="3"
                placeholder="Write a description"
                onChange={handleChange}
                value={values.description}
              />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
