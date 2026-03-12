import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import Card from '../../components/ui/card/Card'
import Input from '../../components/ui/Input'
import Pagination from '../../components/ui/Pagination'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import { eventsApi } from '../../api/routes/events.api'
import type { EventResponse } from '../../api/types'
import { formatDate, formatTime } from '../../utils/time-format'

const PAGE_SIZE = 6

const EventsListPage = () => {
	const { navigate } = useNavigationStore()
	const [events, setEvents] = useState<EventResponse[]>([])
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

	const totalPages = Math.ceil(total / PAGE_SIZE)

	const fetchEvents = (searchValue: string, pageValue: number) => {
		eventsApi
			.findAll({
				search: searchValue || undefined,
				page: pageValue,
				limit: PAGE_SIZE,
			})
			.then(res => {
				setEvents(res.data)
				setTotal(res.total)
			})
	}

	useEffect(() => {
		fetchEvents(search, page)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])

	const handleSearchChange = (value: string) => {
		setSearch(value)
		setPage(1)
		if (searchTimeout.current) clearTimeout(searchTimeout.current)
		searchTimeout.current = setTimeout(() => {
			fetchEvents(value, 1)
		}, 300)
	}

	const handleJoin = async (id: string) => {
		await eventsApi.join(id)
		setEvents(prev =>
			prev.map(e =>
				e.id === id
					? {
							...e,
							isParticipant: true,
							participantCount: e.participantCount + 1,
						}
					: e,
			),
		)
	}

	const handleLeave = async (id: string) => {
		await eventsApi.leave(id)
		setEvents(prev =>
			prev.map(e =>
				e.id === id
					? {
							...e,
							isParticipant: false,
							participantCount: e.participantCount - 1,
						}
					: e,
			),
		)
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
				{events.map(event => (
					<Card
						key={event.id}
						title={event.title}
						description={event.description}
						date={formatDate(event.date)}
						time={formatTime(event.date)}
						address={event.location}
						joinedParticipants={String(event.participantCount)}
						totalParticipants={
							event.capacity !== null ? String(event.capacity) : '∞'
						}
						isOrganizer={event.isOrganizer === true}
						isJoined={event.isParticipant}
						onJoin={() => handleJoin(event.id)}
						onLeave={() => handleLeave(event.id)}
						onClick={() => navigate('event-details', { id: event.id })}
					/>
				))}
			</div>

			<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
		</>
	)
}

export default EventsListPage
