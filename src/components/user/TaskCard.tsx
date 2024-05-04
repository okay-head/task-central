import { useState } from 'react'
import { deleteFn } from '../api/apiCalls'
import toast from 'react-hot-toast'
import { format } from 'fecha'
import { Edit, Trash, Edit2 } from 'react-feather'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

type T = {
  title: string
  description: string
  _id: string
  updatedAt: string
}
export default function TaskCard({
  title = 'Task',
  _id: id,
  description,
  updatedAt,
}: T) {
  const [checked, setChecked] = useState(false)

  const navigate = useNavigate()
  function playAudio() {
    const audio = new Audio(
      'https://cdn.freesound.org/previews/683/683424_14670263-lq.mp3',
      // 'https://cdn.freesound.org/previews/553/553027_9961300-lq.ogg',
    )
    audio.play()
  }

  const handleEdit = () => {
    const cardState = { title, id, description }
    navigate('/user/editTask', { state: cardState })
  }

  const handleDelete = async () => {
    toast.success('Delete queued..')
    console.log(id)
    try {
      const response = await deleteFn(id)
      console.log(response)
      window.location.reload()
    } catch (error) {
      // needlessly complicated because- types
      let err: AxiosError | string = error as AxiosError
      err = err.code || 'Unknown error. Check console'
      toast.error(err)
      console.log(error)
    }
  }

  const parseDate = (dateStr: string) =>
    format(new Date(dateStr), 'Do MMMM, YYYY')

  return (
    <div className='task-card-container relative sm:w-max md:w-[24rem]'>
      <span
        id='task-card-container-before'
        className={`${checked ? 'completed' : ''}`}
      ></span>
      <span
        id='task-card-container-after'
        className={`${checked ? 'completed' : ''}`}
      ></span>
      <div className='card bg-base-300 shadow-xl'>
        <div className='card-body gap-[0.2rem]'>
          <div className='-mb-3 -mt-2 flex items-end font-medium'>
            <button
              onClick={handleEdit}
              className='hover: btn btn-ghost btn-xs ms-auto text-xs text-slate-500 '
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className='btn btn-ghost btn-xs text-xs text-slate-500 hover:bg-red-700'
            >
              <Trash size={16} />
            </button>
          </div>
          <div className='flex items-center gap-2'>
            <Edit />
            <h2 className='card-title text-2xl  '>{title}</h2>
          </div>

          <h4 className='-mt-1 mb-1 ms-8 text-sm text-neutral-400'>
            {parseDate(updatedAt)}
          </h4>
          <p className='text ms-8'>{description}</p>
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
