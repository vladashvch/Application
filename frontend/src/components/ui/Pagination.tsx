import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
	page: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
	if (totalPages <= 1) return null

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<div className='flex items-center justify-center gap-1 mt-2'>
			<button
				className='p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
				aria-label='Previous page'
			>
				<ChevronLeft size={16} />
			</button>

			{pages.map(p => (
				<button
					key={p}
					className={`min-w-[2rem] h-8 px-2 rounded-lg text-sm font-medium transition-colors ${
						p === page
							? 'bg-indigo-600 text-white'
							: 'text-gray-600 hover:bg-gray-100'
					}`}
					onClick={() => onPageChange(p)}
					aria-label={`Page ${p}`}
					aria-current={p === page ? 'page' : undefined}
				>
					{p}
				</button>
			))}

			<button
				className='p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
				aria-label='Next page'
			>
				<ChevronRight size={16} />
			</button>
		</div>
	)
}

export default Pagination
