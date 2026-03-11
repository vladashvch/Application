import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/button/Button'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import WeekCalendar from '../../components/ui/calendar/WeekCalendar'
import MonthCalendar from '../../components/ui/calendar/MonthCalendar'
import { useState } from 'react'
import { MONTH_NAMES } from '../../components/ui/calendar/month-names'

function formatWeekLabel(weekStart: Date): string {
	const weekEnd = new Date(weekStart)
	weekEnd.setDate(weekStart.getDate() + 6)
	const fmt = (d: Date) =>
		`${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}`
	const year = weekEnd.getFullYear()
	return `${fmt(weekStart)} – ${fmt(weekEnd)}, ${year}`
}

const MyEventsPage = () => {
	const { navigate } = useNavigationStore()
	const [calendarType, setCalendarType] = useState<'month' | 'week'>('month')
	const [currentDate, setCurrentDate] = useState(new Date())

	const goBack = () => {
		const d = new Date(currentDate)
		if (calendarType === 'month') d.setMonth(d.getMonth() - 1)
		else d.setDate(d.getDate() - 7)
		setCurrentDate(d)
	}

	const goForward = () => {
		const d = new Date(currentDate)
		if (calendarType === 'month') d.setMonth(d.getMonth() + 1)
		else d.setDate(d.getDate() + 7)
		setCurrentDate(d)
	}

	const weekStart = new Date(currentDate)
	weekStart.setDate(currentDate.getDate() - currentDate.getDay())

	const label =
		calendarType === 'month'
			? `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`
			: formatWeekLabel(weekStart)

	return (
		<>
			<PageHeader
				heading='My Events'
				description='Manage your events here.'
				buttonText='Create Event'
				buttonIcon={<Plus size={14} />}
				onButtonClick={() => navigate('create-event')}
			/>
			<section>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2 items-center mb-4'>
						<Button
							variant='lightBorder'
							icon={<ChevronLeft size={14} />}
							onClick={goBack}
						/>
						<p className='text-lg font-semibold min-w-[200px] text-center'>
							{label}
						</p>
						<Button
							variant='lightBorder'
							icon={<ChevronRight size={14} />}
							onClick={goForward}
						/>
					</div>
					<div className='flex gap-2 items-center mb-4'>
						<Button
							variant={calendarType === 'month' ? 'primary' : 'lightBorder'}
							onClick={() => setCalendarType('month')}
						>
							Month
						</Button>
						<Button
							variant={calendarType === 'week' ? 'primary' : 'lightBorder'}
							onClick={() => setCalendarType('week')}
						>
							Week
						</Button>
					</div>
				</div>
				{calendarType === 'month' ? (
					<MonthCalendar
						year={currentDate.getFullYear()}
						month={currentDate.getMonth()}
						onEventClick={id => navigate('event-details', { id })}
					/>
				) : (
					<WeekCalendar
						weekStart={weekStart}
						onEventClick={id => navigate('event-details', { id })}
					/>
				)}
			</section>
		</>
	)
}

export default MyEventsPage
