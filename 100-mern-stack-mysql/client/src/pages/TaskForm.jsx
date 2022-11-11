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
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          if (!params.id) {
            await createTask(values)
          } else {
            await updateTask(params.id, values)
          }
          //actions.resetForm()
          navigate('/')
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? 'Edit Task' : 'New Task'}
            </h1>
            <label className="block">Title</label>
            <Field
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
              className="px-2 py-1 rounded-sm w-full"
            />
            <label className="block">Description</label>
            <Field
              as="textarea"
              name="description"
              rows="3"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
              className="px-2 py-1 rounded-sm w-full"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white rounded-md w-full"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
