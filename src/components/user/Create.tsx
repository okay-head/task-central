import { useNavigate } from 'react-router-dom'
import Container from '../shared/Container'
import { postFn } from '../api/apiCalls'
import toast from 'react-hot-toast'
// need to manually type this
type T = {
  elements: {
    title: { value: string }
    description: { value: string }
  }
}

export default function Create() {
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as typeof e.target & T
    const {
      title: { value: title },
      description: { value: description },
    } = form?.elements

    // POST
    try {
      const response = await postFn({
        title,
        description,
      })
      console.log(response)
      navigate('/user/tasks')
    } catch (error: unknown) {
      const err = error.code || 'Unknown error. Check console'
      toast.error(err)
      console.log(error)
    }
  }
  return (
    <Container>
      <h1 className='mb-10 w-full border-b pb-4 text-4xl  '>Add task</h1>
      <form
        id='form'
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        className='flex flex-col gap-3'
      >
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Enter task title</span>
          </div>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='add title'
            className='input input-sm input-bordered w-full max-w-xs'
            required
          />
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Description</span>
          </div>
          <textarea
            name='description'
            id='description'
            placeholder='add description'
            className='textarea textarea-bordered textarea-sm w-full max-w-xs'
            required
          />
        </label>

        <button type='submit' className='btn btn-sm mt-2 max-w-28'>
          Add
        </button>
      </form>
    </Container>
  )
}
