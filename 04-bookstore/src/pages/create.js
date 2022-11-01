import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../store/store'
import Layout from '../components/layout'

export default function Create() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [cover, setCover] = useState('')
  const [intro, setIntro] = useState('')
  const [completed, setCompleted] = useState(false)
  const [review, setReview] = useState('')

  const store = useAppContext()
  const navigate = useNavigate()

  const inputStyles = {
    formContainer: {
      width: '400px',
      margin: '0 auto',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      margin: '15px 0',
    },
    title: {
      fontSize: '16px',
      textAlign: 'left',
      color: 'white',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      fontSize: '16px',
    },
  }

  const buttonStyle = {
    padding: '15px 20px',
    minWidth: '200px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#1e9638',
    color: 'white',
    fontWeigth: 'bolder',
    fontSize: '18px',
  }

  function handleOnChange(e) {
    const name = e.target.name
    const value = e.target.value

    switch (name) {
      case 'title':
        setTitle(value)
        break
      case 'author':
        setAuthor(value)
        break
      case 'cover':
        setCover(value)
        break
      case 'intro':
        setIntro(value)
        break
      case 'completed':
        setCompleted(e.target.checked)
        break
      case 'review':
        setReview(value)
        break
      default:
    }
  }

  function handleOnChangeCover(e) {
    const element = e.target
    const file = element.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend = function () {
      setCover(reader.result.toString())
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    const newBook = {
      id: crypto.randomUUID(),
      title: title,
      author: author,
      cover: cover,
      intro: intro,
      completed: completed,
      review: review,
    }

    //Register book
    store.createItem(newBook)

    // Return to home
    navigate('/')
  }

  return (
    <Layout>
      <form onSubmit={handleOnSubmit} style={inputStyles.formContainer}>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Title</div>
          <input
            style={inputStyles.input}
            type="text"
            name="title"
            onChange={handleOnChange}
            value={title}
          />
        </div>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Author</div>
          <input
            style={inputStyles.input}
            type="text"
            name="author"
            onChange={handleOnChange}
            value={author}
          />
        </div>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Cover</div>
          <input
            style={inputStyles.input}
            type="file"
            name="cover"
            onChange={handleOnChangeCover}
          />
          <div>
            {!!cover ? <img src={cover} width="200" alt="preview" /> : ''}
          </div>
        </div>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Introduction</div>
          <input
            style={inputStyles.input}
            type="text"
            name="intro"
            onChange={handleOnChange}
            value={intro}
          />
        </div>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Completed</div>
          <input
            style={inputStyles.input}
            type="checkbox"
            name="completed"
            onChange={handleOnChange}
            value={completed}
          />
        </div>
        <div style={inputStyles.container}>
          <div style={inputStyles.title}>Review</div>
          <input
            style={inputStyles.input}
            type="text"
            name="review"
            onChange={handleOnChange}
            value={review}
          />
        </div>
        <input type="submit" value="Register book" style={buttonStyle} />
      </form>
    </Layout>
  )
}
