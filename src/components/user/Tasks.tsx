import Container from '../shared/Container'
import TaskCard from './TaskCard'
import { getAllFn } from '../shared/apiCalls'
import { useEffect, useState } from 'react'

export default function Tasks() {
  const [tasks, setTasks] = useState<TMongoObject[]>([])

  const getTasks = async () => {
    try {
      const response = await getAllFn()
      setTasks(response)
    } catch (error: any) {
      // toast.error(error)
      console.log(error.code)
    }
  }

  useEffect(() => {
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
