import Container from '../shared/Container'
import TaskCard from './TaskCard'
import { getAllFn } from '../shared/apiCalls'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

export default function Tasks() {
  const [tasks, setTasks] = useState<TMongoObject[]>([])
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value)

  // debounce inside useCallback
  const searchFn = (taskList: TMongoObject[]) => {
    if (query == '') return taskList

    // handle filter
    const newArr = taskList.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    )
    return newArr
  }

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
            onChange={handleSearch}
            value={query}
            type='text'
            placeholder='Search'
            className='input input-sm input-bordered hidden w-24 sm:inline-block md:w-auto'
          />
        </div>
      </div>
      <div className='tasks-container flex grid-cols-2 flex-col place-content-stretch gap-x-4 gap-y-8 sm:flex-row md:grid'>
        {tasks?.length === 0 ? (
          <h2 className='text-lg'>No tasks</h2>
        ) : (
          searchFn(tasks).map((x) => {
            return (
              <TaskCard
                key={x._id}
                title={x.title}
                _id={x._id}
                description={x.description}
              />
            )
          })
        )}
      </div>
    </Container>
  )
}
