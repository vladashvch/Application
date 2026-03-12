import api from '../axios';
import type { AuthResponse, LoginDto, RegisterDto } from '../types';

export const authApi = {
	register: (dto: RegisterDto) =>
		api.post<AuthResponse>('/auth/register', dto).then(r => r.data),

	login: (dto: LoginDto) =>
		api.post<AuthResponse>('/auth/login', dto).then(r => r.data),

	refresh: () =>
		api.post<Pick<AuthResponse, 'accessToken'>>('/auth/refresh').then(r => r.data),

	logout: () => api.post('/auth/logout'),
}
