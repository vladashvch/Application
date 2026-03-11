import { create } from 'zustand'
import { ROUTES, type Page } from './navigation.types';

function parsePath(pathname: string): { currentPage: Page; params: Record<string, string> } {
  const path = pathname === '/' ? '/events' : pathname

  for (const [page, template] of Object.entries(ROUTES) as [Page, string][]) {
    const pattern = new RegExp(
      `^${template.replace(/:([^/]+)/g, '(?<$1>[^/]+)')}$`
    )
    const match = path.match(pattern)
    if (match) return { currentPage: page, params: (match.groups ?? {}) as Record<string, string> }
  }

  return { currentPage: 'events', params: {} }
}

function buildPath(page: Page, params: Record<string, string> = {}): string {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    ROUTES[page],
  )
}

interface NavigationState {
	currentPage: Page
	params: Record<string, string>
	navigate: (page: Page, params?: Record<string, string>) => void
	replace: (page: Page, params?: Record<string, string>) => void
	goBack: () => void
	_syncFromUrl: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
	...parsePath(window.location.pathname),

	navigate: (page, params = {}) => {
		const path = buildPath(page, params)
		window.history.pushState(null, '', path)
		set({ currentPage: page, params })
	},

	replace: (page, params = {}) => {
		const path = buildPath(page, params)
		window.history.replaceState(null, '', path)
		set({ currentPage: page, params })
	},
	goBack: () => window.history.back(),

	_syncFromUrl: () => set(parsePath(window.location.pathname)),
}))
