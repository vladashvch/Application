import { useState } from 'react'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import FormLayout from '../../components/layout/FormLayout'
import Button from '../../components/ui/button/Button'
import { useNavigationStore } from '../../store/navigation/navigation.store'
import Select from '../../components/ui/Select'
import { VISIBILITY_OPTIONS } from '../../mock/event-visability'

const CreateEventPage = () => {
	const { goBack } = useNavigationStore()
	const [visibility, setVisibility] = useState<'public' | 'private'>('public')

	return (
		<>
			<FormLayout
				title='Create New Event'
				description='Fill in the details to create an amazing event'
			>
				<Input label='Event Title' placeholder='Event Name' isRequired={true} />
				<Textarea
					label='Description'
					placeholder='Event Description'
					isRequired={true}
				/>
				<div className='flex gap-4'>
					<div className='flex-1'>
						<Input label='Date' type='date' isRequired={true} />
					</div>
					<div className='flex-1'>
						<Input label='Time' type='time' isRequired={true} />
					</div>
				</div>
				<Input
					label='Location'
					placeholder='e.g., Convention Center, San Francisco'
					isRequired={true}
				/>
				<Input
					label='Capacity (optional)'
					type='number'
					placeholder='Event Capacity'
					details='Maximum number of participants allowed. Leave empty for unlimited capacity.'
				/>
				<Select
					name='visibility'
					label='Visibility'
					value={visibility}
					options={VISIBILITY_OPTIONS}
					onChange={setVisibility}
				/>

				<div className='flex gap-2'>
					<Button variant='lightBorder' className='w-full' onClick={goBack}>
						Cancel
					</Button>
					<Button variant='primary' className='w-full'>
						Create Event
					</Button>
				</div>
			</FormLayout>
		</>
	)
}

export default CreateEventPage
