import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorMsg from '../shared/ErrorMsg'
import Container from '../shared/Container'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useGlobalStore from '../state/GlobalState'
import toast from 'react-hot-toast'
import { signupFn } from '../api/apiCalls'
import { AxiosError } from 'axios'

export default function SignUp() {
  const [disabled, setDisabled] = useState(false)
  const { user, setUser } = useGlobalStore()
  const { state } = useLocation()
  const navigate = useNavigate()
  const navigateTo = !state ? '/user/tasks' : state.to

  // redirect already signed in users to /user/tasks
  useEffect(() => {
    if (user) navigate(navigateTo, { replace: true })
  }, [navigate, user, navigateTo])

  const formSchema = z
    .object({
      username: z
        .string()
        .trim()
        .min(1, 'Username is required')
        .max(15, 'Username too long'),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, 'Email is required')
        .email(),
      password: z
        .string()
        .trim()
        .min(1, 'Password is required')
        .min(12, 'Password must be min 12 chars long')
        .max(24, 'Password can be a maximum of 24 chars long'),
      checkbox: z.boolean(),
    })
    .refine((form) => form.email !== form.password, {
      message: 'Password cannot be the same as email',
      path: ['password'], // path of error
    })

  //single source of truth
  type TForm = z.infer<typeof formSchema>

  //initialising react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      checkbox: false,
    },
    resolver: zodResolver(formSchema),
  })

  // On submit ✅
  const onSubmitHandler: SubmitHandler<TForm> = async ({
    email,
    password,
    username,
  }) => {
    toast.loading('Signing up', {
      duration: 1300,
    })
    setDisabled(true)
    try {
      const response: TUserMongo = await signupFn(email, password, username)

      // introduce artificial delay for signup
      setTimeout(() => {
        setUser({ id: response._id, username: response.username })
      }, 1000)
    } catch (error) {
      toast.dismiss()
      const err = error as AxiosError

      // @ts-expect-error: 'message' property is uniform for err objects
      toast.error(`${err?.response?.data?.message}`)

      console.error(err.response)
      setDisabled(false)
    }
  }

  const onErrorHandler: SubmitErrorHandler<TForm> = (err) => console.error(err)

  const isChecked = watch('checkbox')

  return (
    <Container>
      <form
        id='form'
        name='form'
        onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
      >
        <div className='form-container relative mx-auto max-w-md rounded-md border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] px-6 py-10 lg:px-8'>
          <h1 className='mb-4 block text-2xl font-bold'>Sign up</h1>
          {/* -- username -- */}
          <div className='relative'>
            <input
              {...register('username')}
              className='input input-md input-bordered mb-2 mt-4 w-full'
              type='text'
              name='username'
              id='username'
              placeholder='Enter Username'
            />
            <ErrorMsg>{errors?.username?.message}</ErrorMsg>
          </div>

          {/* email */}
          <div className='relative'>
            <input
              {...register('email')}
              className='input input-md input-bordered mb-2 mt-4 w-full'
              type='email'
              name='email'
              id='email'
              placeholder='Enter Email'
            />
            <ErrorMsg>{errors?.email?.message}</ErrorMsg>
          </div>

          {/* password */}
          <div className='relative'>
            <input
              {...register('password')}
              className='input input-md input-bordered mb-2 mt-4 w-full'
              type='password'
              name='password'
              id='password'
              placeholder='Enter Password'
            />
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
          </div>

          <div>
            <button
              disabled={!isChecked || disabled}
              form='form'
              id='submit'
              className='btn btn-wide mx-auto my-4 block'
            >
              {isChecked && disabled ? (
                <span className='loading loading-spinner loading-md'></span>
              ) : (
                <span className='text-container mx-auto max-w-max'>
                  Sign up
                </span>
              )}
            </button>
          </div>
          <div className='mx-auto my-4 -mb-1 mt-8 flex max-w-max flex-col items-center gap-3 text-sm lg:flex-row lg:gap-0'>
            <input
              disabled={disabled}
              {...register('checkbox')}
              type='checkbox'
              name='checkbox'
              id='checkbox'
              className='checkbox checkbox-xs me-2'
            />
            <div>
              You agree to our{' '}
              <a
                href='https://www.termsfeed.com/public/uploads/2021/12/sample-privacy-policy-template.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='cursor-pointer font-semibold outline-offset-2 outline-neutral-grayBlue hover:underline'
              >
                Terms and Services
              </a>
            </div>
          </div>

          <p className=' absolute left-1/2 top-[105%] min-w-72 -translate-x-1/2 text-center'>
            <span>Already have an account?</span>{' '}
            <span>
              <Link to='/auth/signin' className='link hover:no-underline'>
                Sign in
              </Link>
            </span>
          </p>
        </div>
      </form>
    </Container>
  )
}
