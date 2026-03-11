import React from 'react'
import Button from './button/Button'

const PageHeader = ({
	heading,
	description,
	buttonText,
	buttonIcon,
	onButtonClick,
}: {
	heading: string
	description: string
	buttonText?: string
	buttonIcon?: React.ReactNode
	onButtonClick?: () => void
}) => {
	return (
		<div className='flex justify-between items-center mb-8'>
			<div className='flex flex-col gap-1'>
				<h1 className='text-2xl font-bold '>{heading}</h1>
				<p className='text-gray-600'>{description}</p>
			</div>
			{buttonText && (
				<Button variant='primary' icon={buttonIcon} onClick={onButtonClick}>
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default PageHeader
