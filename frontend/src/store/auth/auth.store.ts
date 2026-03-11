import { create } from 'zustand'
import { clearStorage, loadFromStorage, saveToStorage } from './auth.storage'
import type { AuthState } from './auth.types'

const stored = loadFromStorage()

export const useAuthStore = create<AuthState>()((set, get) => ({
	accessToken: stored.accessToken ?? null,
	refreshToken: stored.refreshToken ?? null,
	name: stored.name ?? null,

	login: ({ accessToken, refreshToken, name }) => {
		saveToStorage(accessToken, refreshToken, name)
		set({ accessToken, refreshToken, name })
	},

	setAccessToken: (accessToken) => {
		const { refreshToken, name } = get()
		if (refreshToken && name) saveToStorage( accessToken, refreshToken, name )
		set({ accessToken })
	},

	logout: () => {
		clearStorage()
		set({ accessToken: null, refreshToken: null, name: null })
	},
}))

