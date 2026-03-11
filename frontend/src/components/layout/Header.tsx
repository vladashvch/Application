import { List, Calendar, Plus, User, LogOut, ArrowLeft } from 'lucide-react'
import Button from '../ui/button/Button'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import { useAuthStore } from '../../store/auth/auth.store'
import UserInfo from '../ui/UserInfo'

type HeaderVariant = 'auth' | 'main' | 'back'

interface HeaderProps {
	variant?: HeaderVariant
}

const Header = ({ variant }: HeaderProps) => {
	const { navigate, goBack, currentPage } = useNavigationStore()
	const { name, logout } = useAuthStore()

	const handleLogout = () => {
		logout()
		navigate('login')
	}

	return (
		<header className='sticky top-0 z-50 flex items-center justify-between p-4 border-gray-300 border-b bg-white'>
			<div
				className={`flex items-center gap-4 ${variant === 'back' ? 'justify-start' : 'justify-end'} w-full`}
			>
				{variant === 'back' && (
					<Button
						variant='light'
						icon={<ArrowLeft size={16} />}
						onClick={goBack}
					>
						Back
					</Button>
				)}

				{variant === 'main' && (
					<>
						<nav className='flex items-center gap-2 flex-wrap'>
							<Button
								variant={currentPage === 'events' ? 'primary' : 'lightBorder'}
								icon={<List size={14} />}
								onClick={() => navigate('events')}
							>
								Events
							</Button>
							<Button
								variant={
									currentPage === 'my-events' ? 'primary' : 'lightBorder'
								}
								icon={<Calendar size={14} />}
								onClick={() => navigate('my-events')}
							>
								My Events
							</Button>
							<Button
								variant={
									currentPage === 'create-event' ? 'primary' : 'lightBorder'
								}
								icon={<Plus size={14} />}
								onClick={() => navigate('create-event')}
							>
								Create Event
							</Button>
						</nav>
						<div className='h-6 w-px bg-gray-300 mx-1' aria-hidden></div>
						<div className='flex items-center gap-3'>
							<UserInfo icon={<User size={16} />} text={name ?? 'User'} />
							<Button
								variant='light'
								icon={<LogOut size={16} />}
								onClick={handleLogout}
							/>
						</div>
					</>
				)}
				{variant === 'auth' && (
					<nav className='flex gap-2'>
						<Button
							variant={currentPage === 'login' ? 'primary' : 'lightBorder'}
							onClick={() => navigate('login')}
						>
							Sign In
						</Button>
						<Button
							variant={currentPage === 'register' ? 'primary' : 'lightBorder'}
							onClick={() => navigate('register')}
						>
							Register
						</Button>
					</nav>
				)}
			</div>
		</header>
	)
}

export default Header
