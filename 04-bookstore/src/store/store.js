import { createContext, useContext, useState } from 'react'

// Context interface
const AppContext = createContext({
  items: [],
  createItem: (item) => {},
  getItem: (id) => {},
  updateItem: (item) => {},
})

// Context implementation
export default function Store({ children }) {
  const [items, setItems] = useState([])

  function createItem(item) {
    const temp = [...items]
    temp.push(item)
    setItems(temp)
  }

  function getItem(id) {
    const item = items.find((p) => p.id === id)
    if (item) {
      return item
    }
  }

  function updateItem(item) {
    const index = items.findIndex((p) => p.id === item.id)
    const temp = [...items]
    temp[index] = { ...item }
  }

  return (
    <AppContext.Provider value={{ items, createItem, getItem, updateItem }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
