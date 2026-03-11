import { useEffect } from 'react'
import Header from './components/layout/Header'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import CreateEventPage from './pages/event/CreateEventPage'
import EventDetailsPage from './pages/event/EventDetailsPage'
import EventsListPage from './pages/events/EventsListPage'
import MyEventsPage from './pages/events/MyEventsPage'
import { useNavigationStore } from './store/navigation/navigation.store'
import { useAuthStore } from './store/auth/auth.store'
import EditEventPage from './pages/event/EditEventPage'

const PUBLIC_PAGES = ['login', 'register'] as const
type PublicPage = (typeof PUBLIC_PAGES)[number]

function App() {
	const { currentPage, replace, _syncFromUrl } = useNavigationStore()
	const isAuthenticated = useAuthStore(s => !!s.accessToken)

	useEffect(() => {
		window.addEventListener('popstate', _syncFromUrl)
		return () => window.removeEventListener('popstate', _syncFromUrl)
	}, [_syncFromUrl])

	useEffect(() => {
		if (!isAuthenticated && !PUBLIC_PAGES.includes(currentPage as PublicPage)) {
			replace('login')
		} else if (
			isAuthenticated &&
			PUBLIC_PAGES.includes(currentPage as PublicPage)
		) {
			replace('events')
		}
	}, [currentPage, isAuthenticated, replace])

	const renderPage = () => {
		switch (currentPage) {
			case 'login':
				return <LoginPage />
			case 'register':
				return <RegisterPage />
			case 'events':
				return <EventsListPage />
			case 'my-events':
				return <MyEventsPage />
			case 'create-event':
				return <CreateEventPage />
			case 'event-details':
				return <EventDetailsPage />
			case 'edit-event':
				return <EditEventPage />
			default:
				return <div className='p-10 text-center'>Page not found</div>
		}
	}

	const getHeaderVariant = () => {
		if (['create-event', 'event-details', 'edit-event'].includes(currentPage))
			return 'back'
		if (PUBLIC_PAGES.includes(currentPage as PublicPage)) return 'auth'
		return 'main'
	}

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col'>
			<Header variant={getHeaderVariant()} />
			<main className='flex flex-col flex-1 p-6 gap-6'>{renderPage()}</main>
		</div>
	)
}
export default App
