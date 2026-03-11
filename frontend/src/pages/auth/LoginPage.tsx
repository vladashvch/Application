import FormLayout from '../../components/layout/FormLayout'
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/Input'

const LoginPage = () => {
	return (
		<FormLayout title='Sign In'>
			<div className='flex flex-col gap-2'>
				<Input label='Email' type='email' placeholder='user@example.com' />
				<Input
					label='Password'
					type='password'
					placeholder='Enter your password'
				/>
			</div>
			<div className='w-full h-px bg-gray-300' aria-hidden></div>

			<Button variant='primary' className='w-full'>
				Sign In
			</Button>
			<p className='flex justify-center gap-1 '>
				Don't have an account?
				<a href='/register' className='text-violet-800 hover:underline'>
					Register here
				</a>
			</p>
		</FormLayout>
	)
}

export default LoginPage
