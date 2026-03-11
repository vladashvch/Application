import Header from './components/layout/Header'
import EventsListPage from './pages/events/EventsListPage'

function App() {

	return (
		<div className='min-h-screen bg-gray-50 flex flex-col'>
			<Header variant={'main'} />
			<main className='flex flex-col flex-1 p-6 gap-6'>
				<EventsListPage />
			</main>
		</div>
	)
}
export default App
