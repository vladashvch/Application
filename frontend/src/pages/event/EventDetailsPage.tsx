import { useState } from 'react'
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	Pencil,
	Trash2,
	LogIn,
	LogOut,
	User,
} from 'lucide-react'
import FormLayout from '../../components/layout/FormLayout'
import { CardInfo } from '../../components/ui/card/CardInfo'
import Button from '../../components/ui/button/Button'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import { MOCK_EVENTS } from '../../mock/events'
import ElementsList from '../../components/ui/ElementsList'
import UserInfo from '../../components/ui/UserInfo'

const CURRENT_USER_ID = 'user-2'

const EventDetailsPage = () => {
	const { params, replace, navigate } = useNavigationStore()
	const event = MOCK_EVENTS.find(e => e.id === params.id)

	const [isJoined, setIsJoined] = useState(
		() => event?.participants.some(p => p.id === CURRENT_USER_ID) ?? false,
	)
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	if (!event) {
		replace('events')
		return null
	}

	const isOrganizer = CURRENT_USER_ID === event.organizerId

	const handleDeleteConfirm = () => {
		setShowDeleteModal(false)
		// TODO: call delete API then navigate away
		replace('events')
	}

	return (
		<>
			<ConfirmModal
				isOpen={showDeleteModal}
				title='Delete Event'
				description={`Are you sure you want to delete "${event.title}"? This action cannot be undone.`}
				confirmLabel='Delete'
				onConfirm={handleDeleteConfirm}
				onCancel={() => setShowDeleteModal(false)}
			/>

			<FormLayout
				title={event.title}
				description={event.description}
				maxWidth='max-w-2xl'
			>
				<div className='flex flex-col gap-2'>
					<CardInfo icon={<Calendar size={14} />} text={event.date} />
					<CardInfo icon={<Clock size={14} />} text={event.time} />
					<CardInfo icon={<MapPin size={14} />} text={event.location} />
					<CardInfo
						icon={<Users size={14} />}
						text={`${event.participants.length} / ${event.capacity} spots filled`}
					/>
				</div>

				<div className='w-full h-px bg-gray-200' aria-hidden />

				<ElementsList
					elements={event.participants.map(p => (
						<UserInfo icon={<User size={16} />} text={p.name ?? 'User'} />
					))}
					info={{
						name: 'Participants',
						noElements: 'No participants yet.',
						additionalInfo:
							event.capacity !== undefined
								? `${event.participants.length} / ${event.capacity} spots filled`
								: undefined,
					}}
				/>

				<div className='w-full h-px bg-gray-200' aria-hidden />

				<div className='flex items-center justify-between gap-3'>
					{!isOrganizer && (
						<div>
							{isJoined ? (
								<Button
									variant='lightBorder'
									icon={<LogOut size={14} />}
									onClick={() => setIsJoined(false)}
								>
									Leave Event
								</Button>
							) : (
								<Button
									variant='join'
									icon={<LogIn size={14} />}
									onClick={() => setIsJoined(true)}
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
								onClick={() => navigate('edit-event', { id: event.id })}
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
