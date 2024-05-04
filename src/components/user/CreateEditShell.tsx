import { useEffect } from 'react'
import Create from './Create'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CreateEditShell() {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const mode = pathname == '/user/create' ? 'create' : 'edit'

  // if no data is provided in edit mode, abort
  useEffect(() => {
    if (!state && mode == 'edit') navigate('/user/tasks')
  }, [state, mode, navigate])

  // ⭐⭐ force a re-render with key prop
  return <Create mode={mode} cardState={state} key={mode} />
}
