import { useState } from 'react'
import { deleteFn } from '../shared/apiCalls'

export default function TaskCard({
  title = 'Task',
  _id: id,
}: {
  title: string
  _id: string
}) {
  const [checked, setChecked] = useState(false)

  function playAudio() {
    var audio = new Audio(
      'https://cdn.freesound.org/previews/683/683424_14670263-lq.mp3',
      // 'https://cdn.freesound.org/previews/553/553027_9961300-lq.ogg',
    )
    audio.play()
  }

  const handleDelete = async () => {
    console.log(id)
    try {
      const response = await deleteFn(id)
      console.log(response)
      window.location.reload()
    } catch (error: any) {
      // toast.error(error)
      console.log(error.code)
    }
  }
  return (
    <div className='task-card-container relative sm:w-max'>
      <span
        id='task-card-container-before'
        className={`${checked ? 'completed' : ''}`}
      ></span>
      <span
        id='task-card-container-after'
        className={`${checked ? 'completed' : ''}`}
      ></span>
      <div className='card bg-base-300 shadow-xl'>
        <div className='card-body'>
          <div className='-mb-3 -mt-2 flex items-end font-medium'>
            <button className='btn btn-ghost btn-xs ms-auto text-xs text-slate-500 hover:text-[--white-primary]'>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className='btn btn-ghost btn-xs text-xs text-slate-500 hover:bg-red-700 hover:text-[--white-primary]'
            >
              Remove
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-6 w-6'
            >
              <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
              <path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
            </svg>

            <h2 className='card-title text-2xl text-[--white-primary]'>
              {title}
            </h2>
          </div>
          <h4 className='-mt-1 mb-1 ms-8 text-sm text-neutral-400'>
            1st Jan, 2024
          </h4>
          <p className='text ms-8'>Pick up laundry from Downtown street</p>
          <div className='form-control -mb-3 ms-8 mt-2'>
            <label className='label max-w-[135px] cursor-pointer gap-2'>
              <span className='label-text text-xs'>Mark as completed</span>
              <input
                type='checkbox'
                className='checkbox checkbox-xs'
                onClick={() => {
                  if (!checked) playAudio()
                  setChecked((val) => !val)
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
