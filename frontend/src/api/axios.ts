import axios, {
	type AxiosError,
	type InternalAxiosRequestConfig,
} from 'axios'
import { useAuthStore } from '../store/auth/auth.store'

const api = axios.create({
	baseURL: '/api',
	headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let pendingQueue: Array<{
	resolve: (token: string) => void
	reject: (err: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null) {
	pendingQueue.forEach(({ resolve, reject }) =>
		error ? reject(error) : resolve(token!),
	)
	pendingQueue = []
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = useAuthStore.getState().accessToken
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

api.interceptors.response.use(
	res => res,
	async (error: AxiosError) => {
		const original = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean
		}

		if (error.response?.status !== 401 || original._retry) {
			return Promise.reject(error)
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				pendingQueue.push({ resolve, reject })
			}).then(token => {
				original.headers.Authorization = `Bearer ${token}`
				return api(original)
			})
		}

		original._retry = true
		isRefreshing = true

		try {
			const refreshToken = useAuthStore.getState().refreshToken
			const { data } = await axios.post<{ accessToken: string }>(
				'/api/auth/refresh',
				null,
				{ headers: { Authorization: `Bearer ${refreshToken}` } },
			)
			useAuthStore.getState().setAccessToken(data.accessToken)
			processQueue(null, data.accessToken)
			original.headers.Authorization = `Bearer ${data.accessToken}`
			return api(original)
		} catch (refreshError) {
			processQueue(refreshError, null)
			useAuthStore.getState().logout()
			return Promise.reject(refreshError)
		} finally {
			isRefreshing = false
		}
	},
)

export default api
