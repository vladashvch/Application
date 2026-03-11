import type { ReactNode } from 'react'
import Button from './button/Button'

interface ConfirmModalProps {
	isOpen: boolean
	title: string
	description?: ReactNode
	confirmLabel?: string
	cancelLabel?: string
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmModal = ({
	isOpen,
	title,
	description,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	onConfirm,
	onCancel,
}: ConfirmModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-title'
			onClick={onCancel}
		>
			<div
				className='bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex flex-col gap-1'>
					<h2 id='modal-title' className='text-lg font-semibold text-gray-900'>
						{title}
					</h2>
					{description && (
						<p className='text-sm text-gray-500'>{description}</p>
					)}
				</div>

				<div className='flex gap-3 justify-end'>
					<Button variant='lightBorder' onClick={onCancel}>
						{cancelLabel}
					</Button>
					<Button variant='danger' onClick={onConfirm}>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
