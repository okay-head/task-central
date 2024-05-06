import axios from 'axios'
const baseUrl = 'https://task-central-backend.onrender.com'
// const baseUrl = 'http://localhost:8000'
const getAllFn = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks`, { withCredentials: true })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const getFn = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/${id}`, {
      withCredentials: true,
    })
    // if (!res.data) return Promise.reject('Bad request')
    return res.data
  } catch (error) {
    return Promise.reject('TOAST: Error fetching data')
  }
}

const postFn = async (payload: TPayload) => {
  try {
    const res = await axios.post(`${baseUrl}/tasks`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const patchFn = async (id: string, payload: TPayload) => {
  try {
    const res = await axios.patch(`${baseUrl}/tasks/${id}`, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const deleteFn = async (id: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/tasks/${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const pingFn = async () => {
  try {
    const res = await axios.get(`${baseUrl}/`)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const signinFn = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${baseUrl}/auth/signin`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const logoutFn = async () => {
  try {
    const res = await axios.post(
      `${baseUrl}/auth/logout`,
      {},
      { withCredentials: true },
    )
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
export {
  getAllFn,
  getFn,
  postFn,
  patchFn,
  deleteFn,
  pingFn,
  signinFn,
  logoutFn,
}
