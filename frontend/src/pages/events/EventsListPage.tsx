import { useState } from 'react'
import { Search } from 'lucide-react'
import Card from '../../components/ui/card/Card'
import Input from '../../components/ui/Input'
import Pagination from '../../components/ui/Pagination'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import { MOCK_EVENTS } from '../../mock/events'

const PAGE_SIZE = 6

const EventsListPage = () => {
	const { navigate } = useNavigationStore()
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set())

	const filtered = MOCK_EVENTS.filter(e =>
		e.title.toLowerCase().includes(search.toLowerCase()),
	)
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
	const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

	const handleSearchChange = (value: string) => {
		setSearch(value)
		setPage(1)
	}

	return (
		<>
			<div className='flex flex-col gap-1'>
				<h1 className='text-2xl font-bold'>Discover Events</h1>
				<p className='text-gray-600'>
					Find and join exciting events happening around you
				</p>
			</div>

			<Input
				icon={<Search size={14} />}
				placeholder='Search events...'
				className='bg-white w-full max-w-md'
				value={search}
				onChange={e => handleSearchChange(e.target.value)}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{paginated.map(event => (
					<Card
						key={event.id}
						title={event.title}
						description={event.description}
						date={event.date}
						time={event.time}
						address={event.location}
						joinedParticipants={String(event.participants.length)}
						totalParticipants={String(event.capacity)}
						isJoined={joinedIds.has(event.id)}
						onJoin={() => setJoinedIds(prev => new Set(prev).add(event.id))}
						onLeave={() =>
							setJoinedIds(prev => {
								const next = new Set(prev)
								next.delete(event.id)
								return next
							})
						}
						onClick={() => navigate('event-details', { id: event.id })}
					/>
				))}
			</div>

			<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
		</>
	)
}

export default EventsListPage
