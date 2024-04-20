import { Link } from 'react-router-dom'
import { List, Plus, Moon } from 'react-feather'
export default function Navbar() {
  const isSignedIn = false
  return (
    <div>
      <div className='navbar fixed bg-base-100 py-3 shadow lg:px-8'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost btn-sm text-xl'>
            Task Central
          </Link>
          <button
            className='btn btn-ghost btn-xs'
            onClick={() => {
              const currentTheme = document
                .getElementsByTagName('html')[0]
                .getAttribute('data-theme')

              const newTheme = currentTheme === 'dim' ? 'light' : 'dim'
              document
                .getElementsByTagName('html')[0]
                .setAttribute('data-theme', newTheme)
            }}
          >
            <Moon size={18} className='-ms-1 pt-[1px]' />
          </button>
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
            <span className='hidden md:inline-block'>All tasks</span>
          </Link>
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
