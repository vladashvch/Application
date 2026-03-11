import { DAYS_OF_WEEK } from './days-of-week'

interface MonthCalendarProps {
	year: number
	month: number
	onEventClick?: (id: string) => void
}

const MonthCalendar = ({ year, month, onEventClick }: MonthCalendarProps) => {
	const now = new Date()
	const currentYear = year
	const currentMonth = month
	const todayDate = now.getDate()
	const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

	const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
	const emptySlots = Array.from({ length: firstDayIndex })

	const occupiedSlots = firstDayIndex + daysInMonth
	const totalGridSlots = 42
	const emptySlotsAtEnd = Array.from({ length: totalGridSlots - occupiedSlots })
	return (
		<div className='grid grid-cols-7 border border-gray-200 rounded-lg text-xs'>
			{DAYS_OF_WEEK.map(day => (
				<div key={day} className='bg-gray-100 font-medium p-2 text-center'>
					{day}
				</div>
			))}

			{emptySlots.map((_, i) => (
				<div
					key={`empty-${i}`}
					className='border-r border-b border-gray-200 border-gray-50 bg-gray-100'
				/>
			))}

			{days.map(day => {
				const isToday = isCurrentMonth && day === todayDate

				return (
					<div
						key={day}
						className={`
                            min-h-[100px] border-r border-b border-gray-200 p-2  cursor-pointer 
                            flex flex-col gap-2 transition-colors hover:bg-gray-50
                            ${isToday ? 'border-t-2 border-t-indigo-600 border-l-2 border-l-indigo-600 bg-indigo-50/20' : ''}
                        `}
					>
						<span
							className={`font-medium ${isToday ? 'text-indigo-600' : 'text-gray-700'}`}
						>
							{day}
						</span>

						{day === 15 && (
							<div
								className='w-full bg-indigo-100 text-indigo-600 text-[12px] font-semibold rounded px-2 py-1 truncate text-xs cursor-pointer hover:bg-indigo-200 transition-colors'
								onClick={e => {
									e.stopPropagation()
									onEventClick?.('evt-4')
								}}
							>
								15:30 - NestJS Workshop
							</div>
						)}
					</div>
				)
			})}
			{emptySlotsAtEnd.map((_, i) => (
				<div
					key={`empty-end-${i}`}
					className='border-r border-b border-gray-200 border-gray-50 bg-gray-100'
				/>
			))}
		</div>
	)
}

export default MonthCalendar
