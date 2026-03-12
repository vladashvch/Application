export interface UserEventResponse {
	id: string
	title: string
	date: string // ISO
	description: string
	location: string
	capacity?: number | null
	organizer_name?: string | null
	isOrganizer: boolean
}

export type CalendarView = 'monthly' | 'weekly'
