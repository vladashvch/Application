import api from '../axios'
import type { UserEventResponse, CalendarView } from '../types'

export const usersApi = {
	getMyEvents: (view: CalendarView, date?: string) =>
		api
			.get<UserEventResponse[]>('/users/me/events', {
				params: { view, ...(date ? { date } : {}) },
			})
			.then(r => r.data),
}
