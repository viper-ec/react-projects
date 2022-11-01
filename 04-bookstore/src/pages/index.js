import { useAppContext } from '../store/store'
import Layout from '../components/layout'
import BookItem from '../components/bookItem'

export default function Index() {
  const store = useAppContext()

  // JS styles
  const booksContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  }

  return (
    <Layout>
      <div style={booksContainer}>
        {store.items.map((item) => (
          <BookItem key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  )
}
