import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode
	label?: string
	details?: string
	isRequired?: boolean
}

const Input = ({
	type = 'text',
	icon,
	label,
	details,
	isRequired = false,
	className = '',
	...props
}: InputProps) => {
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
                flex gap-2 items-center border-gray-300 border rounded-lg p-2 
                text-gray-600 
                focus-within:border-indigo-600 transition-colors
                ${className}
            `}
			>
				{icon && <span className='flex-shrink-0'>{icon}</span>}

				<input
					type={type}
					className={`
                        ${type === 'text' || type === 'password' || type === 'email' ? 'w-full' : 'w-auto'} 
                        border-none focus:outline-none bg-transparent cursor-text
                    `}
					{...props}
				/>
			</div>
			{details && <p className='text-xs text-gray-500'>{details}</p>}
		</div>
	)
}

export default Input
