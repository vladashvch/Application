import type { StoredAuth } from './auth.types'

function loadFromStorage(): Partial<StoredAuth> {
	try {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')
		const name = localStorage.getItem('name')
		if (accessToken && refreshToken && name) return { accessToken, refreshToken, name }
		return {}
	} catch {
		return {}
	}
}

function saveToStorage(accessToken: string, refreshToken: string, name: string) {
	localStorage.setItem('accessToken', accessToken)
	localStorage.setItem('refreshToken', refreshToken)
	localStorage.setItem('name', name)
}

function clearStorage() {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('name')
}

export { loadFromStorage, saveToStorage, clearStorage }