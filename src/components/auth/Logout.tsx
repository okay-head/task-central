import { AxiosError } from 'axios'
import { logoutFn } from '../api/apiCalls'
import useGlobalStore from '../state/GlobalState'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Logout() {
  const setUser = useGlobalStore((state) => state.setUser)
  const navigate = useNavigate()
  const logoutCleanup = () => {
    setTimeout(() => {
      // reset state
      setUser(null)

      localStorage.clear()
      sessionStorage.clear()
      navigate('/')
    }, 500)
  }
  logoutFn()
    .then(() => {
      logoutCleanup()
    })
    .catch((error) => {
      error = error as AxiosError

      toast.error(error.response.data?.message, {
        duration: 1800,
      })
      console.error(error.response)
      logoutCleanup()
    })
  return (
    <div className='absolute inset-0 z-10 grid min-h-screen place-content-center gap-8 bg-base-100'>
      <span className='loading loading-spinner loading-lg mx-auto'></span>
      <h3 className='text-xl font-semibold lg:text-3xl'>Logging out</h3>
    </div>
  )
}
