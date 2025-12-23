'use client'

import { useEffect, useState, createContext } from "react"
import BodySec from "../components/BodySec"
import Title from "../components/Title"
import { Services, type apiProps } from '../api'
import ItemList from "../components/ItemList"

interface ContextProps {
  clickHandler: (type: string) => void
  fetchTodos: () => void
}

export const TodoContext = createContext<ContextProps>({
  clickHandler: (type: string) => { },
  fetchTodos: () => { }
})

const TodoPage = () => {
  useEffect(() => {
    fetchTodos()
  }, [])

  const [todo, setTodo] = useState<apiProps[]>([])

  const fetchTodos = async () => {
    const data = await Services.getAll()
    console.log(data)
    setTodo(data)
  }

  const [filter, setFilter] = useState('all')

  const [query, setQuery] = useState('')

  const filteredItems = todo.filter(listData => `${listData.title} ${listData.description}`.toLowerCase().includes(query.toLowerCase()))

  const clickHandler = (type: string) => {
    setFilter(type)
  }

  return (
    <TodoContext.Provider value={{ clickHandler, fetchTodos }}>
      <div className="bg-white rounded-2xl min-w-1/2 h-full flex flex-col p-10 gap-4">
        <Title />
        <BodySec query={query} setQuery={setQuery} todos={todo} />
        <div className="bg-green-50 w-full flex flex-col gap-6 py-5">
          {filteredItems.length === 0
            ? <p className='text-center text-2xl font-bold my-20'>No items found</p>
            : filteredItems.sort((b, a) => a.date.localeCompare(b.date)).sort((b, a) => a.status.localeCompare(b.status)).map((item) => {
              if (filter === 'all' || item.status === filter) {
                return (
                  <ItemList key={item.id} item={item} onOrderCreated={fetchTodos} />
                )
              }
            })
          }
        </div>
      </div>
    </TodoContext.Provider>
  )
}

export default TodoPage