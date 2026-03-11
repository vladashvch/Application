import FormLayout from '../../components/layout/FormLayout'
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/Input'

const RegisterPage = () => {
	return (
		<FormLayout title='Register'>
			<div className='flex flex-col gap-2'>
				<Input label='Email' type='email' placeholder='user@example.com' />
				<Input
					label='Password'
					type='password'
					placeholder='Enter your password'
				/>
				<Input
					label='Confirm password'
					type='password'
					placeholder='Confirm your password'
				/>
			</div>
			<div className='w-full h-px bg-gray-300' aria-hidden></div>

			<Button variant='primary' className='w-full'>
				Register
			</Button>
			<p className='flex justify-center gap-1 '>
				Already have an account?
				<a href='/login' className='text-violet-800 hover:underline'>
					Sign in here
				</a>
			</p>
		</FormLayout>
	)
}

export default RegisterPage
