export function formatDate(iso: string | Date): string {
	return new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

export function formatTime(iso: string | Date): string {
	const d = new Date(iso)
	return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function toISODateTime(date: string, time: string): string {
	return new Date(`${date}T${time}`).toISOString()
}
