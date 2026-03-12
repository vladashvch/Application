import { useEffect, useState } from 'react'
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	Pencil,
	Trash2,
	LogIn,
	LogOut,
	UserRound,
	User,
} from 'lucide-react'
import FormLayout from '../../components/layout/FormLayout'
import { CardInfo } from '../../components/ui/card/CardInfo'
import Button from '../../components/ui/button/Button'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import { eventsApi } from '../../api/routes/events.api'
import type { EventResponse } from '../../api/types'
import { formatDate, formatTime } from '../../utils/time-format'
import ElementsList from '../../components/ui/ElementsList'
import UserInfo from '../../components/ui/UserInfo'

const EventDetailsPage = () => {
	const { params, replace } = useNavigationStore()
	const [event, setEvent] = useState<EventResponse | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	useEffect(() => {
		if (!params.id) {
			replace('events')
			return
		}
		eventsApi
			.findOne(params.id)
			.then(setEvent)
			.catch(() => replace('events'))
	}, [params.id, replace])

	if (!event) return null

	const isFull =
		event.capacity !== null ? event.participantCount >= event.capacity : false

	const { isOrganizer, isParticipant } = event

	const handleJoin = async () => {
		await eventsApi.join(event.id)
		eventsApi.findOne(event.id).then(setEvent)
	}

	const handleLeave = async () => {
		await eventsApi.leave(event.id)
		eventsApi.findOne(event.id).then(setEvent)
	}

	const handleDeleteConfirm = async () => {
		setShowDeleteModal(false)
		await eventsApi.remove(event.id)
		replace('my-events')
	}

	return (
		<>
			<ConfirmModal
				isOpen={showDeleteModal}
				title='Delete Event'
				description={`Are you sure you want to delete this event?`}
				confirmLabel='Delete'
				onConfirm={handleDeleteConfirm}
				onCancel={() => setShowDeleteModal(false)}
			/>

			<FormLayout
				title={event.title}
				description={event.description}
				maxWidth='max-w-lg'
			>
				<div className='flex flex-col gap-2'>
					<CardInfo
						icon={<Calendar size={14} />}
						text={formatDate(event.date)}
					/>
					<CardInfo icon={<Clock size={14} />} text={formatTime(event.date)} />
					<CardInfo icon={<MapPin size={14} />} text={event.location} />
					<CardInfo
						icon={<Users size={14} />}
						text={
							event.capacity !== null
								? `${event.participantCount} / ${event.capacity} spots filled`
								: `${event.participantCount} participants`
						}
					/>
					<CardInfo
						icon={<UserRound size={14} />}
						text={`Organized by ${event.organizer}`}
					/>
				</div>
				<ElementsList
					elements={event.participants.map((p: string, i: number) => (
						<UserInfo icon={<User size={16} />} text={p ?? 'User'} key={i} />
					))}
					info={{
						name: 'Participants',
						noElements: 'No participants yet.',
						additionalInfo:
							event.capacity !== null
								? `${event.participants.length} / ${event.capacity} spots filled`
								: `${event.participants.length} / ∞`,
					}}
				/>

				<div className='w-full h-px bg-gray-200' aria-hidden />

				<div className='flex items-center justify-between gap-3'>
					{!isOrganizer && !isFull && (
						<div>
							{isParticipant ? (
								<Button
									variant='lightBorder'
									icon={<LogOut size={14} />}
									onClick={handleLeave}
								>
									Leave Event
								</Button>
							) : (
								<Button
									variant='join'
									icon={<LogIn size={14} />}
									onClick={handleJoin}
								>
									Join Event
								</Button>
							)}
						</div>
					)}

					{isOrganizer && (
						<div className='flex gap-2 ml-auto'>
							<Button
								variant='lightBorder'
								icon={<Pencil size={14} />}
								onClick={() => replace('edit-event', { id: event.id })}
							>
								Edit
							</Button>
							<Button
								variant='danger'
								icon={<Trash2 size={14} />}
								onClick={() => setShowDeleteModal(true)}
							>
								Delete
							</Button>
						</div>
					)}
				</div>
			</FormLayout>
		</>
	)
}

export default EventDetailsPage
