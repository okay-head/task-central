import Container from '../shared/Container'
import TaskCard from './TaskCard'
import { getAllFn } from '../shared/apiCalls'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

export default function Tasks() {
  const [tasks, setTasks] = useState<TMongoObject[]>([])

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
    toast.loading(
      //only show this on the very first render
      <span className='text-sm'>
        Fetching data...
        <br />
        The delay might be due to cold starts of the dev environment
      </span>,
    )
    getTasks()
  }, [])

  return (
    <Container>
      <h1 className='mb-10 w-full border-b pb-4 text-4xl text-[--white-primary] '>
        Tasks
      </h1>
      <div className='tasks-container flex grid-cols-2 flex-col place-content-stretch gap-x-4 gap-y-8 sm:flex-row md:grid'>
        {tasks?.length === 0 ? (
          <h2 className='text-lg'>No tasks</h2>
        ) : (
          tasks.map((x) => {
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
