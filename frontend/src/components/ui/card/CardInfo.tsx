import React from 'react'

interface CardInfoProps {
	icon?: React.ReactNode
	text?: React.ReactNode
}

export const CardInfo = ({ icon, text }: CardInfoProps) => {
	return (
		<div className='flex items-center gap-2 text-gray-500 text-sm'>
			{icon}
			<p>{text}</p>
		</div>
	)
}
