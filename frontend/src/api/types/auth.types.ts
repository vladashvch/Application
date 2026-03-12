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
