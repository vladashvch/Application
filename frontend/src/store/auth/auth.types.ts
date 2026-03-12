interface StoredAuth {
	accessToken: string
	refreshToken: string
	name: string
}

interface AuthState {
	accessToken: string | null
	refreshToken: string | null
	name: string | null

	login: (payload: { accessToken: string; refreshToken: string; name: string }) => void
	setAccessToken: (token: string) => void
	logout: () => void
}

export type { StoredAuth, AuthState }