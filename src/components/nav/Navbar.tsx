import { Link } from 'react-router-dom'
import { List, Plus } from 'react-feather'
export default function Navbar() {
  const isSignedIn = false
  return (
    <div>
      <div className='navbar fixed bg-base-100 py-3 shadow lg:px-8'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost btn-sm text-xl'>
            Task Central
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <Link
            to='/user/create'
            className='btn btn-ghost btn-xs sm:btn-sm sm:mx-2'
          >
            <Plus size={20} />
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg> */}
            <span className='hidden md:inline-block'>Add task</span>
          </Link>

          <Link
            to='user/tasks'
            className='btn btn-ghost btn-xs sm:btn-sm sm:mx-2'
          >
            <List size={20} />
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
              />
            </svg> */}
            <span className='hidden md:inline-block'>All tasks</span>
          </Link>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Search'
              className='input input-sm input-bordered hidden w-24 sm:inline-block md:w-auto'
            />
          </div>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='avatar btn btn-circle btn-ghost'
            >
              <div className='w-9 rounded-full'>
                <img alt='Avatar' src='/user.webp' />
              </div>
            </div>
            {isSignedIn ? (
              <ul
                tabIndex={0}
                className='menu dropdown-content menu-sm z-[1] mt-3 w-48 rounded-box border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-base-100 shadow lg:px-2 lg:py-4'
              >
                <li>
                  <Link to='user/tasks' className='justify-between'>
                    My tasks
                  </Link>
                </li>
                <li>
                  <Link to='user/logout'>Logout</Link>
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className='menu dropdown-content menu-sm z-[1] mt-3 w-48 rounded-box border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-base-100 shadow lg:px-2 lg:py-4'
              >
                <li>
                  <Link to='auth/signin' className='justify-between'>
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
