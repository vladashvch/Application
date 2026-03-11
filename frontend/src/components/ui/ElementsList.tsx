interface ElementsListProps {
	elements: React.ReactNode[]
	info: {
		noElements: string
		name: string
		additionalInfo?: string
	}
}

const ElementsList = ({ elements, info }: ElementsListProps) => {
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex items-center justify-between'>
				<p className='text-xs font-medium text-gray-700'>{info.name}</p>
				{info.additionalInfo && (
					<span className='text-xs text-gray-400'>{info.additionalInfo}</span>
				)}
			</div>

			{elements.length === 0 ? (
				<p className='text-sm text-gray-400 italic'>{info.noElements}</p>
			) : (
				<ul className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1'>
					{elements.map((el, i) => (
						<li key={i} className='flex items-center gap-3'>
							{el}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ElementsList
