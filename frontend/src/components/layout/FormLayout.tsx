import type { ReactNode } from 'react'

interface FormLayoutProps {
	title: string
	description?: string
	children: ReactNode
	maxWidth?: string
}

const FormLayout = ({
	title,
	description,
	children,
	maxWidth = 'max-w-xl',
}: FormLayoutProps) => {
	return (
		<div
			className={`${maxWidth} mx-auto my-10 border border-gray-300 rounded-xl p-6 bg-white shadow-sm text-sm`}
		>
			<div className='mb-6'>
				<h1 className='text-2xl font-bold mb-1'>{title}</h1>
				{description && <p className='text-sm text-gray-500'>{description}</p>}
			</div>

			<div className='flex flex-col gap-6'>{children}</div>
		</div>
	)
}

export default FormLayout
