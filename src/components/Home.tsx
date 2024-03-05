import { Link } from 'react-router-dom'
import Container from './shared/Container'
const signedIn = false
export default function Home() {
  return (
    <Container>
      {signedIn ? (
        <h2>All Tasks</h2>
      ) : (
        <section>
          <div className='mx-auto max-w-7xl items-center px-8 py-12 md:px-12 lg:px-16 lg:py-24'>
            <div className='max-auto w-full justify-center text-center lg:p-10'>
              <div className='mx-auto w-full justify-center'>
                <h1 className='mt-8 text-5xl font-medium tracking-tighter text-[--white-primary]'>
                  Tasks home
                </h1>
                <p className='mx-auto mt-4 max-w-xl text-lg tracking-tight'>
                  Sign in to create and manage your tasks.
                </p>
              </div>
              <div className='mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-3 lg:flex-row'>
                {' '}
                <Link to='/auth/signin' className='btn'>
                  Sign In
                </Link>
                <a
                  href='https://github.com/okay-head/task-central'
                  target='_blank'
                  rel='noopner noreferrer'
                  className='text-primary link-hover link inline-flex items-center justify-center text-sm font-semibold duration-200 focus:outline-none focus-visible:outline-gray-600'
                >
                  Code →
                </a>{' '}
              </div>
            </div>
          </div>
        </section>
      )}
    </Container>
  )
}
