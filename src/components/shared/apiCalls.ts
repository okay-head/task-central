import axios from 'axios'

const getAllFn = async () => {
  try {
    const res = await axios.get('http://localhost:5500/items')
    return res.data
  } catch (error) {
    return Promise.reject('TOAST: Error fetching data')
  }
}
const getFn = async (id: string) => {
  try {
    const res = await axios.get('http://localhost:5500/items/' + id)
    // if (!res.data) return Promise.reject('Bad request')
    return res.data
  } catch (error) {
    return Promise.reject('TOAST: Error fetching data')
  }
}
const postFn = async (payload: TPayload) => {
  try {
    const res = await axios.post('http://localhost:5500/items', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    return Promise.reject(error)
  }
}

export { getAllFn, getFn, postFn }
