import { Form, Formik, Field } from 'formik'
import { useTasks } from '../context/TaskProvider'

export default function TaskForm() {
  const { createTask } = useTasks()

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      onSubmit={async (values, actions) => {
        createTask(values)
        actions.resetForm()
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
  )
}
