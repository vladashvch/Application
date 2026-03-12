import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { CardInfo } from './CardInfo'
import Button from '../button/Button'

const Card = ({
	title,
	description,
	date,
	time,
	address,
	joinedParticipants,
	totalParticipants,
	isJoined,
	onJoin,
	isOrganizer,
	onLeave,
	onClick,
}: {
	title: string
	description: string
	date: string
	time: string
	address: string
	joinedParticipants: string
	totalParticipants: string
	isJoined?: boolean
	isOrganizer?: boolean
	onJoin?: () => void
	onLeave?: () => void
	onClick?: () => void
}) => {
	const isFull = totalParticipants === joinedParticipants
	return (
		<div
			className='group border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer'
			onClick={onClick}
		>
			<div className='flex flex-col gap-1'>
				<h2 className='text-base font-semibold group-hover:text-indigo-600 transition-colors'>
					{title}
				</h2>
				<p className='text-sm text-gray-500'>{description}</p>
			</div>
			<div className='py-2 flex flex-col gap-1'>
				<CardInfo icon={<Calendar size={14} />} text={date} />
				<CardInfo icon={<Clock size={14} />} text={time} />
				<CardInfo icon={<MapPin size={14} />} text={address} />
				<CardInfo
					icon={<Users size={14} />}
					text={`${joinedParticipants} / ${totalParticipants}`}
				/>
			</div>
			<div className='w-full h-px bg-gray-300' aria-hidden></div>

			{!isOrganizer &&
				(isJoined ? (
					<Button
						variant='lightBorder'
						onClick={e => {
							e.stopPropagation()
							onLeave?.()
						}}
					>
						Leave Event
					</Button>
				) : isFull ? (
					<Button variant='disabled' disabled>
						Full
					</Button>
				) : (
					<Button
						variant='join'
						onClick={e => {
							e.stopPropagation()
							onJoin?.()
						}}
					>
						Join Event
					</Button>
				))}
		</div>
	)
}

export default Card
