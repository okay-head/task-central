import Container from '../shared/Container'
import TaskCard from './TaskCard'
import { getAllFn } from '../api/apiCalls'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { AxiosError } from 'axios'
import useDataStore from '../state/DataState'

export default function Tasks() {
  const { setTasks, tasks } = useDataStore()
  // const [tasks, setTasks] = useState<TMongoObject[]>([])

  // setting up search query
  // decoupling controlled input state from filter query
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  const setInputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setQueryFn(e.target.value)
  }

  const setQueryFn = useDebouncedCallback((val: string) => {
    setQuery(val.toLowerCase())
  }, 200)

  const filteredArray = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query),
  )

  // Data fetching
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await getAllFn()
        setTasks(response)
      } catch (error) {
        const err = error as AxiosError

        //@ts-expect-error fml
        toast.error(err.response.data?.message, {
          duration: 1800,
        })
        console.error(err.response)
      }
    }
    // 🚄 PERFORMANCE: MOST BASIC GLOBAL STATE CACHING
    // only get tasks if the global state array is zero
    // this is incorrect because an array could be zero as well, check for null instead
    if (tasks?.length === 0) getTasks()
  }, [setTasks, tasks])

  return (
    <Container>
      <div className='mb-10 flex w-full items-end justify-between border-b pb-4'>
        <h1 className='text-4xl font-semibold'>Tasks</h1>
        <div className='form-control'>
          <input
            onChange={setInputFn}
            value={input}
            type='text'
            placeholder='Search'
            name='search'
            className='input input-sm input-bordered hidden w-24 sm:inline-block md:w-auto'
          />
        </div>
      </div>
      <div className='tasks-container flex grid-cols-2 flex-col place-content-stretch gap-x-4 gap-y-8 sm:flex-row md:grid'>
        {filteredArray?.length === 0 ? (
          <h2 className='text-lg'>No tasks</h2>
        ) : (
          filteredArray?.map((x) => {
            return (
              <TaskCard
                key={x._id}
                title={x.title}
                _id={x._id}
                description={x.description}
                updatedAt={x.updatedAt}
              />
            )
          })
        )}
      </div>
    </Container>
  )
}
