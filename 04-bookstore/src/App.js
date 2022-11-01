import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Store from './store/store'

import Index from './pages/index'
import About from './pages/about'
import Create from './pages/create'
import View from './pages/view'

function App() {
  return (
    <>
      <Store>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view/:bookId" element={<View />} />
          </Routes>
        </Router>
      </Store>
    </>
  )
}

export default App
