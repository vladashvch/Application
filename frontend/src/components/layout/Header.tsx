import { List, Calendar, Plus, User, LogOut, ArrowLeft } from 'lucide-react'
import Button from '../ui/button/Button'
import UserInfo from '../ui/UserInfo'

type HeaderVariant = 'auth' | 'main' | 'back'

interface HeaderProps {
	variant?: HeaderVariant
}

const Header = ({ variant }: HeaderProps) => {
	const currentPage = 'events'
	return (
		<header className='sticky top-0 z-50 flex items-center justify-between p-4 border-gray-300 border-b bg-white'>
			<div
				className={`flex items-center gap-4 ${variant === 'back' ? 'justify-start' : 'justify-end'} w-full`}
			>
				{variant === 'back' && (
					<Button
						variant='light'
						icon={<ArrowLeft size={16} />}
						onClick={() => console.log('Go back')}
					>
						Back
					</Button>
				)}

				{variant === 'main' && (
					<>
						<nav className='flex items-center gap-2 flex-wrap'>
							<Button
								variant={'primary'}
								icon={<List size={14} />}
								onClick={() => console.log('Go to events list')}
							>
								Events
							</Button>
							<Button
								variant={'primary'}
								icon={<Calendar size={14} />}
								onClick={() => console.log('Go to my events')}
							>
								My Events
							</Button>
							<Button
								variant={'primary'}
								icon={<Plus size={14} />}
								onClick={() => console.log('Go to create event')}
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
								onClick={() => console.log('Logout')}
							/>
						</div>
					</>
				)}
				{variant === 'auth' && (
					<nav className='flex gap-2'>
						<Button
							variant={'primary'}
							onClick={() => console.log('Go to login')}
						>
							Sign In
						</Button>
						<Button
							variant={'primary'}
							onClick={() => console.log('Go to register')}
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
