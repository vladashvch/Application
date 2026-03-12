import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { BUTTON_VARIANTS } from './button-types'

type ButtonVariant = keyof typeof BUTTON_VARIANTS

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	icon?: ReactNode
	children?: ReactNode
}

const Button = ({
	variant = 'primary',
	icon,
	children,
	className = '',
	...props
}: ButtonProps) => {
	const baseClasses =
		'flex items-center justify-center gap-2 rounded-lg p-2 cursor-pointer font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
	const variantClasses = BUTTON_VARIANTS[variant]

	return (
		<button
			className={`${baseClasses} ${variantClasses} ${className}`}
			{...props}
		>
			{icon && <span className='flex-shrink-0'>{icon}</span>}
			{children && <span className='text-sm'>{children}</span>}
		</button>
	)
}

export default Button
