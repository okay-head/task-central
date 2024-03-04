import { Link } from 'react-router-dom'
import Container from '../shared/Container'
import TaskCard from './TaskCard'

export default function Tasks() {
  const tasks = ['Task1', 'Task2', 'Task3', 'Task4']
  return (
    <Container>
      <div className='mb-10 flex items-center gap-3'>
        <h1 className=' text-4xl font-semibold'>Tasks</h1>
        <Link to='/user/create' className='btn btn-neutral ms-auto'>
          Add
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
            />
          </svg>
        </Link>
      </div>
      <div className='tasks-container grid grid-cols-2 place-content-stretch gap-x-4 gap-y-8'>
        {tasks?.length !== 0 &&
          tasks.map((x, i) => {
            return <TaskCard key={i} title={x} />
          })}
      </div>
    </Container>
  )
}
