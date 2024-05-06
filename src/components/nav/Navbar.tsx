import { Link } from 'react-router-dom'
import { List, Plus, Moon } from 'react-feather'
import useGlobalStore from '../state/GlobalState'
export default function Navbar() {
  const { user } = useGlobalStore()
  return (
    <div>
      <div className='navbar fixed bg-base-100 py-3 shadow lg:px-8'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost btn-sm text-xl font-semibold'>
            Task Central
          </Link>
        </div>
        <div className='flex-none gap-2'>
          {user && (
            <Link
              to={!user ? '/auth/signin' : '/user/create'}
              state={{ to: '/user/create' }}
              className='btn btn-ghost btn-xs sm:btn-sm sm:mx-2'
            >
              <Plus size={20} />
              <span className='hidden md:inline-block'>Add task</span>
            </Link>
          )}
          {user && (
            <Link
              to={!user ? '/auth/signin' : '/user/tasks'}
              state={{ to: '/user/tasks' }}
              className='btn btn-ghost btn-xs sm:btn-sm sm:mx-2'
            >
              <List size={20} />
              <span className='hidden md:inline-block'>All tasks</span>
            </Link>
          )}

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
            {!user ? (
              <ul
                tabIndex={0}
                className='menu dropdown-content menu-sm z-[1] mt-3 w-48 rounded-box border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-base-100 shadow lg:px-2 lg:py-4'
              >
                <li>
                  <Link to='auth/signin'>Login</Link>
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className='menu dropdown-content menu-sm z-[1] mt-3 w-48 rounded-box border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] bg-base-100 shadow lg:px-2 lg:py-4'
              >
                <span className='mb-3 ms-3 flex flex-col border-b border-[var(--fallback-bc,oklch(var(--bc)/0.2))] pb-2'>
                  <span className='mt-1 inline-block text-xs font-semibold opacity-80'>
                    Logged in as
                  </span>
                  <span className='mt-1 inline-block font-semibold'>
                    {user?.username}
                  </span>
                </span>
                <li>
                  <Link to='auth/logout' className='justify-between'>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <button
            className='btn btn-ghost btn-sm -ms-1 py-1'
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
            <Moon size={24} className='' />
          </button>
        </div>
      </div>
    </div>
  )
}
