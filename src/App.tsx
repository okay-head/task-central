import toast, { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import NotFound from './components/NotFound'
import SignIn from './components/auth/SignIn'
import Tasks from './components/user/Tasks'
import CreateEditShell from './components/user/CreateEditShell'
import { useEffect, useRef, useState } from 'react'
import { pingFn } from './components/api/apiCalls'
import Logout from './components/auth/Logout'
import CheckAuth from './components/auth/CheckAuth'

export default function App() {
  const [ready, setReady] = useState(false)
  const toastRef = useRef<null | string>(null)
  const toastRef2 = useRef<null | string>(null)
  // i feel all of this should be app state

  useEffect(() => {
    // ping the API the first thing, to overcome cold start
    pingFn()
      .then(() => setReady(true))
      .catch((err) => err)
  }, [])

  // Cold start notification
  useEffect(() => {
    const local = sessionStorage.getItem('firstLoad')
    //only show this on the very first render
    if (!local) {
      toastRef.current = toast.loading(
        <span className='text-sm'>
          Fetching data...
          <br />
          Can take upto a minute or two due to cold starts of the dev
          environment
        </span>,
        { duration: 4000 },
      )
      toastRef2.current = toast.loading(
        <span className='text-sm'>Please wait...</span>,
      )
    }
    if (toastRef.current && ready && toastRef2.current) {
      toast.dismiss(toastRef.current)
      toastRef.current = null

      toast.dismiss(toastRef2.current)
      toastRef2.current = null
    }
    sessionStorage.setItem('firstLoad', 'true')

    return () => {}
  }, [ready])

  return (
    <div className='app'>
      <Toaster />
      <Navbar />
      {/* login signup home */}
      <Routes>
        <Route path='/' />
        <Route index element={<Home />} />
        <Route path='/auth'>
          <Route index element={<NotFound />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='logout' element={<Logout />} />
        </Route>
        <Route path='*' element={<NotFound />} />

        {/* --- 🔒--- */}
        <Route path='/user' element={<CheckAuth />}>
          <Route index path='tasks' element={<Tasks />} />
          <Route path='create' element={<CreateEditShell />} />
          <Route path='editTask' element={<CreateEditShell />} />
          <Route path='*' element={<NotFound />} />
          {/* right now it is empty, add a user profile later */}
          {/* <Route path='logout' element={<Logout />} /> */}
        </Route>
        {/* --- Protected routes end--- */}

        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}
