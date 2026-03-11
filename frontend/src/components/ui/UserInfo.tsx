const UserInfo = ({ icon, text }: { icon: React.ReactNode; text?: string }) => {
	return (
		<div className='flex items-center gap-2'>
			{icon && (
				<div className='bg-indigo-100 text-indigo-600 rounded-full p-1.5'>
					{icon}
				</div>
			)}
			<p className='text-sm font-semibold text-gray-700'>{text}</p>
		</div>
	)
}

export default UserInfo
