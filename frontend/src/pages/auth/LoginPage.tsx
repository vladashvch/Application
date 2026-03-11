import { useState } from 'react'
import FormLayout from '../../components/layout/FormLayout'
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/Input'
import { authApi } from '../../api/routes/auth.api'
import { useAuthStore } from '../../store/auth/auth.store'
import { useNavigationStore } from '../../store/navigation/navigation.store'

const LoginPage = () => {
	const login = useAuthStore(s => s.login)
	const { navigate } = useNavigationStore()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			const data = await authApi.login({ email, password })
			login(data)
			navigate('events')
		} catch {
			setError('Invalid email or password.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<FormLayout title='Sign In'>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-2'>
					<Input
						label='Email'
						type='email'
						placeholder='user@example.com'
						autoComplete='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						label='Password'
						type='password'
						placeholder='Enter your password'
						autoComplete='current-password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				{error && <p className='text-sm text-red-500'>{error}</p>}
				<div className='w-full h-px bg-gray-300' aria-hidden />
				<Button
					type='submit'
					variant='primary'
					className='w-full'
					disabled={loading}
				>
					{loading ? 'Signing in…' : 'Sign In'}
				</Button>
			</form>
			<p className='flex justify-center gap-1'>
				Don't have an account?
				<a href='/register' className='text-violet-800 hover:underline'>
					Register here
				</a>
			</p>
		</FormLayout>
	)
}

export default LoginPage
