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
      <div className='mb-10 flex items-center gap-3'>
        <h1 className='w-full border-b pb-4 text-4xl font-semibold text-[--white-primary]'>
          Tasks
        </h1>
      </div>
      <div className='tasks-container grid grid-cols-2 place-content-stretch gap-x-4 gap-y-8'>
        {tasks?.length === 0 ? (
          <h2 className='text-lg'>No tasks</h2>
        ) : (
          tasks.map((x) => {
            return <TaskCard key={x._id} title={x.name} _id={x._id} />
          })
        )}
      </div>
    </Container>
  )
}
