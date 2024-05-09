import { Link } from 'react-router-dom'
import Container from './shared/Container'
import useGlobalStore from './state/GlobalState'

export default function Home() {
  const { user } = useGlobalStore()

  return (
    <Container>
      <section>
        <div className='mx-auto max-w-7xl items-center px-8 py-12 md:px-12 lg:px-16 lg:py-24'>
          <div className='max-auto w-full justify-center text-center lg:p-10'>
            <div className='mx-auto w-full justify-center'>
              <h1 className='mt-8 text-5xl tracking-tighter'>Tasks home</h1>
              <p className='mx-auto mt-4 max-w-xl text-lg tracking-tight'>
                Create and manage your tasks.
              </p>
              {/* <p className='mx-auto mt-4 max-w-xl text-center text-sm tracking-tight text-warning'>
                Note: Please enable third party cookies for the site to work
              </p> */}
            </div>
            <div className='mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-5 lg:flex-row'>
              {' '}
              <Link
                to={!user ? '/auth/signin' : '/user/tasks'}
                state={{ to: '/user/tasks' }}
                className='btn'
              >
                See Tasks
              </Link>
              <a
                href='https://github.com/okay-head/task-central'
                target='_blank'
                rel='noopner noreferrer'
                className='link-hover link inline-flex items-center justify-center text-sm font-semibold duration-200 focus:outline-none focus-visible:outline-gray-600'
              >
                Code →
              </a>{' '}
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
