import api from '../axios'
import type {
	PaginatedEventsResponse,
	GetEventsParams,
	EventResponse,
	CreateEventDto,
	UpdateEventDto,
	SuccessResponse,
} from '../types'

export const eventsApi = {
	findAll: (params?: GetEventsParams) =>
		api.get<PaginatedEventsResponse>('/events', { params }).then(r => r.data),

	findOne: (id: string) =>
		api.get<EventResponse>(`/events/${id}`).then(r => r.data),

	create: (dto: CreateEventDto) =>
		api.post<EventResponse>('/events', dto).then(r => r.data),

	update: (id: string, dto: UpdateEventDto) =>
		api.patch<EventResponse>(`/events/${id}`, dto).then(r => r.data),

	remove: (id: string) =>
		api.delete<SuccessResponse>(`/events/${id}`).then(r => r.data),

	join: (id: string) =>
		api.post<SuccessResponse>(`/events/${id}/join`).then(r => r.data),

	leave: (id: string) =>
		api.post<SuccessResponse>(`/events/${id}/leave`).then(r => r.data),
}
