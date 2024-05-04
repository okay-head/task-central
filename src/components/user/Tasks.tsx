import Container from '../shared/Container'
import TaskCard from './TaskCard'
import { getAllFn } from '../api/apiCalls'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { AxiosError } from 'axios'

export default function Tasks() {
  const [tasks, setTasks] = useState<TMongoObject[]>([])

  const toastRef = useRef<null | string>(null)

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
        // needlessly complicated because- types
        let err: AxiosError | string = error as AxiosError
        err = err.code || 'Unknown error. Check console'
        toast.error(err)
        console.log(error)
      }
    }
    getTasks()
  }, [])

  // Cold start notification
  useEffect(() => {
    const local = sessionStorage.getItem('firstLoad')
    //only show this on the very first render
    if (!local) {
      toastRef.current = toast.loading(
        <span className='text-sm'>
          Fetching data...
          <br />
          Can take upto a minute or two due to cold starts of the dev
          environment
        </span>,
      )
    }
    // technically it shouldn't be a check of empty array, should set the array default state to null instead of []
    if (tasks.length != 0 && toastRef.current) {
      toast.dismiss(toastRef.current)
      toastRef.current = null
    }
    sessionStorage.setItem('firstLoad', 'true')

    return () => {}
  }, [tasks.length])

  return (
    <Container>
      <div className='mb-10 flex w-full items-end justify-between border-b pb-4'>
        <h1 className='text-4xl'>Tasks</h1>
        <div className='form-control'>
          <input
            onChange={setInputFn}
            value={input}
            type='text'
            placeholder='Search'
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
