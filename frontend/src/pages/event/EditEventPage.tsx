import { useEffect, useState } from 'react'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import FormLayout from '../../components/layout/FormLayout'
import Button from '../../components/ui/button/Button'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import Select from '../../components/ui/Select'
import { VISIBILITY_OPTIONS } from '../../utils/event-visibility'
import { eventsApi } from '../../api/routes/events.api'
import { toISODateTime } from '../../utils/time-format'

const EditEventPage = () => {
	const { goBack, params, replace } = useNavigationStore()
	const [visibility, setVisibility] = useState<'public' | 'private'>('public')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [location, setLocation] = useState('')
	const [capacity, setCapacity] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

	const clearFieldError = (field: string) =>
		setFieldErrors(e => {
			const next = { ...e }
			delete next[field]
			return next
		})

	const validate = () => {
		const e: Record<string, string> = {}
		if (!title.trim()) e.title = 'Title is required.'
		if (!description.trim()) e.description = 'Description is required.'
		if (!date) e.date = 'Date is required.'
		if (!location.trim()) e.location = 'Location is required.'
		if (capacity && (isNaN(Number(capacity)) || Number(capacity) <= 0))
			e.capacity = 'Capacity must be a positive number.'
		setFieldErrors(e)
		return Object.keys(e).length === 0
	}

	useEffect(() => {
		if (!params.id) return
		eventsApi.findOne(params.id).then(event => {
			const d = new Date(event.date)
			setTitle(event.title)
			setDescription(event.description)
			setDate(d.toISOString().slice(0, 10))
			setTime(d.toTimeString().slice(0, 5))
			setLocation(event.location)
			setCapacity(event.capacity !== null ? String(event.capacity) : '')
			setVisibility(event.isPublic ? 'public' : 'private')
		})
	}, [params.id])

	const handleSubmit = async () => {
		if (!params.id) return
		if (!validate()) return
		setError(null)
		setLoading(true)
		try {
			await eventsApi.update(params.id, {
				title,
				description,
				date: toISODateTime(date, time || '00:00'),
				location,
				capacity: capacity ? Number(capacity) : null,
				isPublic: visibility === 'public',
			})
			replace('event-details', { id: params.id })
		} catch {
			setError('Failed to save changes. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<FormLayout
				title='Edit Event'
				description='Update the details of your event'
			>
				<Input
					label='Event Title'
					placeholder='Event Name'
					isRequired
					value={title}
					error={fieldErrors.title}
					onChange={e => {
						setTitle(e.target.value)
						clearFieldError('title')
					}}
				/>
				<Textarea
					label='Description'
					placeholder='Event Description'
					isRequired
					value={description}
					error={fieldErrors.description}
					onChange={e => {
						setDescription(e.target.value)
						clearFieldError('description')
					}}
				/>
				<div className='flex gap-4'>
					<div className='flex-1'>
						<Input
							label='Date'
							type='date'
							isRequired
							value={date}
							error={fieldErrors.date}
							onChange={e => {
								setDate(e.target.value)
								clearFieldError('date')
							}}
						/>
					</div>
					<div className='flex-1'>
						<Input
							label='Time'
							type='time'
							value={time}
							onChange={e => setTime(e.target.value)}
						/>
					</div>
				</div>
				<Input
					label='Location'
					placeholder='e.g., Convention Center, San Francisco'
					isRequired
					value={location}
					error={fieldErrors.location}
					onChange={e => {
						setLocation(e.target.value)
						clearFieldError('location')
					}}
				/>
				<Input
					label='Capacity (optional)'
					type='number'
					placeholder='Event Capacity'
					details='Maximum number of participants allowed. Leave empty for unlimited capacity.'
					value={capacity}
					error={fieldErrors.capacity}
					onChange={e => {
						setCapacity(e.target.value)
						clearFieldError('capacity')
					}}
				/>
				<Select
					name='visibility'
					label='Visibility'
					value={visibility}
					options={VISIBILITY_OPTIONS}
					onChange={setVisibility}
				/>
				{error && <p className='text-sm text-red-500'>{error}</p>}
				<div className='flex gap-2'>
					<Button variant='lightBorder' className='w-full' onClick={goBack}>
						Cancel
					</Button>
					<Button
						variant='primary'
						className='w-full'
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? 'Saving…' : 'Save Changes'}
					</Button>
				</div>
			</FormLayout>
		</>
	)
}

export default EditEventPage
