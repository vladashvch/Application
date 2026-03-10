import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	isRequired?: boolean
	className?: string
}

const Textarea = ({
	label,
	isRequired = false,
	className = '',
	...props
}: TextareaProps) => {
	return (
		<div className='flex flex-col gap-1.5'>
			{label && (
				<label className='font-medium text-gray-700 ml-1'>
					{label}
					{isRequired && <span className='text-red-500'> *</span>}
				</label>
			)}

			<div
				className={`
					border border-gray-300 rounded-lg p-2
					 text-gray-600
					focus-within:border-indigo-600 transition-colors
					${className}
				`}
			>
				<textarea
					rows={4}
					className='w-full border-none focus:outline-none cursor-text '
					{...props}
				/>
			</div>
		</div>
	)
}

export default Textarea
