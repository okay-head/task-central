import { useNavigate } from 'react-router-dom'
import Container from '../shared/Container'
import { patchFn, postFn } from '../api/apiCalls'
import toast from 'react-hot-toast'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import useDataStore from '../state/DataState'

type T = {
  mode: 'create' | 'edit'
  cardState: { title: string; id: string; description: string } | null
}

export default function Create({ mode, cardState = null }: T) {
  const { tasks, setTasks } = useDataStore()
  const [defaultValues, setDefaultValues] = useState({
    title: !cardState || mode == 'create' ? '' : cardState.title,
    description: !cardState || mode == 'create' ? '' : cardState.description,
  })
  useEffect(() => {
    if (mode == 'create') setDefaultValues({ title: '', description: '' })
    else {
      cardState &&
        setDefaultValues({
          title: cardState?.title,
          description: cardState?.description,
        })
    }
  }, [mode, cardState])
  const navigate = useNavigate()

  const formSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(18, 'Max length reached for title'),
    description: z
      .string()
      .trim()
      .min(1, 'Description is required')
      .max(33, 'Max length reached for description'),
  })
  type TForm = z.infer<typeof formSchema>

  // ✅ on submit
  const onSubmit: SubmitHandler<TForm> = async ({ title, description }) => {
    // POST OR PATCH depending on the mode
    if (mode == 'create') {
      // POST
      try {
        const doc = await postFn({
          title,
          description,
        })
        // update global state
        if (!tasks) throw new Error('Cannot post. Tasks is null')
        setTasks([doc, ...tasks])

        toast.success('Task created!', { duration: 850 })
        navigate('/user/tasks')
      } catch (error) {
        const err = error as AxiosError

        //@ts-expect-error fml
        toast.error(err.response.data?.message, {
          duration: 1800,
        })
        console.error(err.response)
      }
      return
    }

    // PATCH
    try {
      if (!cardState) return

      const doc: TMongoObject = await patchFn(cardState?.id, {
        title,
        description,
      })
      if (!tasks) throw new Error('Cannot patch. Tasks is null')
      const patched = tasks.map((x) => {
        if (x._id != doc._id) return x
        x.title = doc.title
        x.description = doc.description
        x.updatedAt = doc.updatedAt
        return x
      })

      setTasks(patched)
      navigate('/user/tasks')
      toast.success('Task updated!', { duration: 800 })
    } catch (error) {
      const err = error as AxiosError

      //@ts-expect-error fml
      toast.error(err.response.data?.message, {
        duration: 1800,
      })
      console.error(err.response)
    }
  }

  const onError: SubmitErrorHandler<TForm> = (err) => {
    console.error(err)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      title: defaultValues.title,
      description: defaultValues.description,
      // description: !cardState || mode == 'create' ? '' : cardState.description,
    },
    resolver: zodResolver(formSchema),
  })

  return (
    <Container>
      <h1 className='mb-10 w-full border-b pb-4 text-4xl font-semibold'>
        {mode == 'create' ? 'Add ' : 'Edit '}
        task
      </h1>
      <form
        id='form'
        onSubmit={handleSubmit(onSubmit, onError)}
        className='flex flex-col gap-4'
        // key={mode}
      >
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text font-semibold'>Enter task title</span>
          </div>
          <input
            {...register('title')}
            type='text'
            name='title'
            id='title'
            placeholder='add title'
            className='input input-sm input-bordered w-full max-w-xs'
          />
          <span className='error-message -mb-2 ms-2 mt-2 text-xs text-red-700'>
            {errors?.title?.message}
          </span>
        </label>
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text font-semibold'>Description</span>
          </div>
          <textarea
            {...register('description')}
            name='description'
            id='description'
            placeholder='add description'
            className='textarea textarea-bordered textarea-sm w-full max-w-xs'
          />
          <span className='error-message -mb-2 ms-2 mt-2 text-xs text-red-700'>
            {errors?.description?.message}
          </span>
        </label>

        <button type='submit' className='btn btn-sm mt-2 max-w-28'>
          Add
        </button>
      </form>
    </Container>
  )
}
