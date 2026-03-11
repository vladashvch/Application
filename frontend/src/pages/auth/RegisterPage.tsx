import { useState } from 'react'
import FormLayout from '../../components/layout/FormLayout'
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/Input'
import { authApi } from '../../api/routes/auth.api'
import { useAuthStore } from '../../store/auth/auth.store'
import { useNavigationStore } from '../../store/navigation/navigation.store'

const RegisterPage = () => {
	const login = useAuthStore(s => s.login)
	const { navigate } = useNavigationStore()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

	const clearFieldError = (field: string) =>
		setFieldErrors(e => {
			const next = { ...e }
			delete next[field]
			return next
		})

	const validate = () => {
		const e: Record<string, string> = {}
		if (!name.trim()) e.name = 'Name is required.'
		if (!email.trim()) e.email = 'Email is required.'
		else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email.'
		if (!password) e.password = 'Password is required.'
		else if (password.length < 6)
			e.password = 'Password must be at least 6 characters.'
		if (!confirm) e.confirm = 'Please confirm your password.'
		else if (confirm !== password) e.confirm = 'Passwords do not match.'
		setFieldErrors(e)
		return Object.keys(e).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return
		setError(null)
		setLoading(true)
		try {
			const data = await authApi.register({ name, email, password })
			login(data)
			navigate('events')
		} catch {
			setError('Registration failed. Email may already be taken.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<FormLayout title='Register'>
			<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-4'>
					<Input
						label='Name'
						placeholder='Your full name'
						autoComplete='name'
						value={name}
						error={fieldErrors.name}
						onChange={e => {
							setName(e.target.value)
							clearFieldError('name')
						}}
					/>
					<Input
						label='Email'
						type='email'
						placeholder='user@example.com'
						autoComplete='email'
						value={email}
						error={fieldErrors.email}
						onChange={e => {
							setEmail(e.target.value)
							clearFieldError('email')
						}}
					/>
					<Input
						label='Password'
						type='password'
						placeholder='Enter your password'
						autoComplete='new-password'
						value={password}
						error={fieldErrors.password}
						onChange={e => {
							setPassword(e.target.value)
							clearFieldError('password')
						}}
					/>
					<Input
						label='Confirm password'
						type='password'
						placeholder='Confirm your password'
						autoComplete='new-password'
						value={confirm}
						error={fieldErrors.confirm}
						onChange={e => {
							setConfirm(e.target.value)
							clearFieldError('confirm')
						}}
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
					{loading ? 'Registering…' : 'Register'}
				</Button>
			</form>
			<p className='flex justify-center gap-1'>
				Already have an account?
				<a href='/login' className='text-violet-800 hover:underline'>
					Sign in here
				</a>
			</p>
		</FormLayout>
	)
}

export default RegisterPage
