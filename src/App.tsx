import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import NotFound from './components/NotFound'
import SignIn from './components/auth/SignIn'
import Tasks from './components/user/Tasks'
import Create from './components/user/Create'
import EditTask from './components/user/EditTask'

//   import { useEffect } from 'react'
// import 'preline/preline'
// import { IStaticMethods } from 'preline/preline'
// import SignUp from './components/auth/SignUp'
// import SignIn from './components/auth/SignIn'
// import Home from './components/feed/Home'
// import NotFound from './NotFound'
// import Users from './components/users/Users'
// import Profile from './components/profile/Profile'
// import CheckAuth from './components/auth/CheckAuth'
// import CreateWave from './components/user/CreateWave'
// import Logout from './components/auth/Logout'

export default function App() {
  return (
    <div className='app'>
      <Navbar />
      <Toaster />
      {/* login signup home */}
      <Routes>
        <Route path='/' />
        <Route index element={<Home />} />
        <Route path='/auth'>
          <Route index element={<NotFound />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        <Route path='*' element={<NotFound />} />

        {/* <Route path='/users' element={<Users />} /> */}

        {/* --- Protected routes (Only accessible when signed in) --- */}
        <Route path='/user'>
          <Route index path='tasks' element={<Tasks />} />
          <Route path='create' element={<Create />} />
          <Route path='editTask' element={<EditTask />} />
          <Route path='*' element={<NotFound />} />
          <Route path='' element={<NotFound />} />{' '}
          {/* right now it is empty, add a user profile later */}
          {/* <Route path='logout' element={<Logout />} /> */}
        </Route>
        {/* --- Protected routes end--- */}

        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}
