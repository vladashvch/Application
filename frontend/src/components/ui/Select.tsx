interface SelectOption<T extends string> {
	value: T
	label: string
}

interface SelectProps<T extends string> {
	name: string
	label?: string
	value: T
	options: SelectOption<T>[]
	onChange: (value: T) => void
}

const Select = <T extends string>({
	name,
	label,
	value,
	options,
	onChange,
}: SelectProps<T>) => {
	return (
		<div className='flex flex-col gap-1.5'>
			{label && <p className='font-medium text-gray-700 ml-1'>{label}</p>}
			<div className='flex flex-col gap-2'>
				{options.map(opt => (
					<label key={opt.value} className='flex gap-2 cursor-pointer group'>
						<input
							type='radio'
							name={name}
							checked={value === opt.value}
							onChange={() => onChange(opt.value)}
							className='accent-indigo-600 w-4 h-4 mt-0.5'
						/>
						<span>{opt.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}

export default Select
