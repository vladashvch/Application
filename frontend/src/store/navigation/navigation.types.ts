export type Page =
	| 'events'
	| 'event-details'
	| 'create-event'
	| 'edit-event'
	| 'my-events'
	| 'login'
	| 'register'

export const ROUTES: Record<Page, string> = {
  'events': '/events',
  'event-details': '/events/:id',
  'create-event': '/events/new',
  'edit-event': '/events/:id/edit',
  'my-events': '/my-events',
  'login': '/login',
  'register': '/register',
}
