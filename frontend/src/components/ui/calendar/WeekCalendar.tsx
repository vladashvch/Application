import { DAYS_OF_WEEK } from './days-of-week'
import { formatTime } from '../../../utils/time-format'
import type { UserEventResponse } from '../../../api/types'

interface WeekCalendarProps {
	weekStart: Date
	events?: UserEventResponse[]
	onEventClick?: (id: string) => void
}

const WeekCalendar = ({
	weekStart,
	events = [],
	onEventClick,
}: WeekCalendarProps) => {
	const now = new Date()

	const weekDays = Array.from({ length: 7 }, (_, i) => {
		const day = new Date(weekStart)
		day.setDate(weekStart.getDate() + i)
		return {
			name: DAYS_OF_WEEK[i],
			date: day.getDate(),
			fullDate: day.toDateString(),
			isToday: day.toDateString() === now.toDateString(),
			dayDate: day,
		}
	})

	const eventsForDay = (dayDate: Date) =>
		events.filter(
			e => new Date(e.date).toDateString() === dayDate.toDateString(),
		)

	return (
		<div className='grid gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7'>
			{weekDays.map(day => (
				<div
					key={day.fullDate}
					className={`
						flex-1 min-h-[120px] border border-gray-200 rounded-xl p-3
						flex flex-col gap-2 transition-all cursor-pointer hover:border-indigo-300 bg-white
						${day.isToday ? 'border border-indigo-600 hover:border-indigo-800' : ''}
					`}
				>
					<div className='flex flex-col justify-between font-semibold'>
						<span className={day.isToday ? 'text-indigo-600' : ''}>
							{day.name}
						</span>
						<span className='text-gray-400'>{day.date}</span>
					</div>

					<div className='flex flex-col gap-1'>
						{eventsForDay(day.dayDate).length === 0 ? (
							<p className='text-gray-500 text-xs'>No events</p>
						) : (
							eventsForDay(day.dayDate).map(e => (
								<div
									key={e.id}
									className='w-full bg-indigo-100 text-indigo-600 text-[12px] font-semibold rounded px-2 py-1 truncate cursor-pointer hover:bg-indigo-200 transition-colors'
									onClick={ev => {
										ev.stopPropagation()
										onEventClick?.(e.id)
									}}
								>
									<p>{formatTime(e.date)}</p>
									<p>{e.title}</p>
								</div>
							))
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default WeekCalendar
