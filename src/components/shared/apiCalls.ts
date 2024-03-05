import axios from 'axios'
// const baseUrl = 'https://task-central-backend.onrender.com'
const baseUrl = 'http://localhost:5500'
const getAllFn = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks`)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
const getFn = async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/${id}`)
    // if (!res.data) return Promise.reject('Bad request')
    return res.data
  } catch (error) {
    return Promise.reject('TOAST: Error fetching data')
  }
}
const postFn = async (payload: TPayload) => {
  try {
    const res = await axios.post(`${baseUrl}/tasks`, payload, {
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
    const res = await axios.delete(`${baseUrl}/tasks/${id}`)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getAllFn, getFn, postFn, deleteFn }
