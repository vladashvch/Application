// ── Auth ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	name: string
}

export interface LoginDto {
	email: string
	password: string
}

export interface RegisterDto {
	email: string
	password: string
	name: string
}

// ── Events ───────────────────────────────────────────────────────────────────

export interface EventResponse {
	[x: string]: unknown
	id: string
	title: string
	description: string
	date: string // ISO datetime
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

export interface CreateEventDto {
	title: string
	description: string
	date: string // ISO datetime
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

export interface SuccessResponse {
	success: boolean
}

// ── Users ────────────────────────────────────────────────────────────────────

export interface UserEventResponse {
	id: string
	title: string
	date: string // ISO datetime
	description: string
	location: string
	capacity?: number | null
	organizer_name?: string | null
	isOrganizer: boolean
}

export type CalendarView = 'monthly' | 'weekly'
