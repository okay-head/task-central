import Container from '../shared/Container'
import TaskCard from './TaskCard'

export default function Tasks() {
  return (
    <Container>
      <h1 className='mb-10 text-4xl font-semibold'>Tasks</h1>
      <div className='tasks-container grid grid-cols-2 gap-x-4 gap-y-8'>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </Container>
  )
}
