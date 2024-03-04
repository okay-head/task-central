import Container from '../shared/Container'
import { getAllFn, getFn, postFn } from '../shared/apiCalls'
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

    // const id = value
    // cors is a security measure to implement SOP
    // console.log(await getAllFn())
    // console.log(await getFn(id))
    // update(id, payload)
    // delete(id)

    // GET one
    //   try {
    //     const response = await getFn(id)
    //     console.log(response.name)
    //   } catch (error) {
    //     // toast.error(error)
    //     console.log(error)
    //   }
    // }

    // POST
    try {
      const response = await postFn({
        name,
        quantity,
        price,
      })
      console.log(response.data)
    } catch (error: any) {
      // toast.error(error)
      console.log(error.code)
    }
  }
  return (
    <Container>
      <h1 className='mb-10 text-3xl'>Create</h1>
      <form
        id='form'
        onSubmit={(e) => {
          handleSubmit(e)
        }}
        className='flex gap-3'
      >
        <input
          type='text'
          name='name'
          id='name'
          placeholder='name'
          className='input input-bordered w-full max-w-xs'
          required
        />
        <input
          type='number'
          name='quantity'
          id='quantity'
          placeholder='quantity'
          className='input input-bordered w-full max-w-xs'
          required
        />
        <input
          type='number'
          name='price'
          id='price'
          placeholder='price'
          className='input input-bordered w-full max-w-xs'
          required
        />
        <button type='submit' className='btn btn-outline'>
          Create
        </button>
      </form>
    </Container>
  )
}
