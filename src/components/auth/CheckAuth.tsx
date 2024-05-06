import { Outlet, useNavigate } from 'react-router-dom'
import useGlobalStore from '../state/GlobalState'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function CheckAuth() {
  const { user } = useGlobalStore()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      toast.error('You must sign in first!')
    }
  }, [user, navigate])

  return (
    <>
      <Outlet />
    </>
  )
}
