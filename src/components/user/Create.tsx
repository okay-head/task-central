import Container from '../shared/Container'
import { postFn } from '../shared/apiCalls'
// need to manually type this
type T = {
  elements: {
    name: { value: string }
    quantity: { value: number }
    price: { value: number }
  }
}

export default function Create() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as typeof e.target & T
    const {
      name: { value: name },
      quantity: { value: quantity },
      price: { value: price },
    } = form?.elements
    console.log(name, Number(quantity), Number(price))

    // POST
    try {
      const response = await postFn({
        name,
        quantity,
        price,
      })
      console.log(response)
    } catch (error: any) {
      // toast.error(error)
      console.log(error.code)
    }
  }
  return (
    <Container>
      <h1 className='mb-10 w-full border-b pb-4 text-4xl text-[--white-primary]'>
        Add task
      </h1>
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
            name='name'
            id='name'
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
