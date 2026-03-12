export interface EventResponse {
	[x: string]: unknown
	id: string
	title: string
	description: string
	date: string // ISO
	location: string
	capacity: number | null
	isPublic: boolean
	createdAt: string
	organizer: string
	participantCount: number
	isOrganizer: boolean
	isParticipant: boolean
	participants: string[]
}

export interface PaginatedEventsResponse {
	data: EventResponse[]
	total: number
}

export interface GetEventsParams {
	search?: string
	page?: number
	limit?: number
}

export interface CreateEventDto {
	title: string
	description: string
	date: string // ISO
	location: string
	capacity?: number | null
	isPublic?: boolean
}
	
export interface UpdateEventDto {
	title?: string
	description?: string
	date?: string
	location?: string
	capacity?: number | null
	isPublic?: boolean
}
