import Container from '../shared/Container'
import TaskCard from './TaskCard'
import { getAllFn } from '../shared/apiCalls'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useDebouncedCallback } from 'use-debounce'

export default function Tasks() {
  const [tasks, setTasks] = useState<TMongoObject[]>([])

  // decoupling controlled input state from filter query
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  const setInputFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setQueryFn(e.target.value)
  }

  const setQueryFn = useDebouncedCallback((val: string) => {
    setQuery(val)
  }, 200)

  const filteredArray = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query),
  )

  const getTasks = async () => {
    try {
      const response = await getAllFn()
      setTasks(response)
      toast.dismiss()
    } catch (error) {
      // toast.error(error)
      const err = error as AxiosError
      console.log(err.code)
    }
  }

  useEffect(() => {
    const local = sessionStorage.getItem('firstLoad')
    //only show this on the very first render
    if (!local) {
      toast.loading(
        <span className='text-sm'>
          Fetching data...
          <br />
          Can take upto a minute or two due to cold starts of the dev
          environment
        </span>,
      )
    }

    sessionStorage.setItem('firstLoad', 'true')
    getTasks()
  }, [])

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
