import { Form, Formik, Field } from 'formik'
import { createTaskRequest } from '../api/Tasks.api.js'

export default function TaskForm() {
  const initialValues = {
    title: '',
    description: '',
  }

  async function handleOnSubmit(values, actions) {
    //console.log(values)
    try {
      const response = await createTaskRequest(values)
      console.log(response)
      actions.resetForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        console.log(values)
        try {
          const response = await createTaskRequest(values)
          console.log(response)
          actions.resetForm()
        } catch (error) {
          console.error(error)
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
  )
}
