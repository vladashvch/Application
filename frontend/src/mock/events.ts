export interface MockEvent {
	id: string
	title: string
	description: string
	date: string
	time: string
	location: string
	capacity: number
	organizerId: string
	participants: { id: string; name: string }[]
}

export const MOCK_EVENTS: MockEvent[] = [
	{
		id: 'evt-1',
		title: 'Community Cleanup',
		description: 'Join us for a community cleanup event to help keep our neighborhood clean and beautiful.',
		date: 'Oct 20, 2025',
		time: '10:00 AM',
		location: '123 Main St, Anytown',
		capacity: 50,
		organizerId: 'user-1',
		participants: Array.from({ length: 25 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-2',
		title: 'Charity Run',
		description: 'Participate in our charity run to raise funds for a good cause and promote a healthy lifestyle.',
		date: 'Aug 20, 2025',
		time: '8:00 AM',
		location: '456 Park Ave, Anytown',
		capacity: 200,
		organizerId: 'user-2',
		participants: Array.from({ length: 100 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-3',
		title: 'Art Workshop',
		description: 'Join our art workshop to explore your creativity and learn new techniques from local artists.',
		date: 'Sep 10, 2025',
		time: '1:00 PM',
		location: '789 Art St, Anytown',
		capacity: 100,
		organizerId: 'user-3',
		participants: Array.from({ length: 50 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-4',
		title: 'React & TypeScript Workshop',
		description: 'A hands-on workshop covering React patterns, TypeScript best practices, and modern tooling. All skill levels welcome.',
		date: 'Mar 15, 2026',
		time: '10:00 AM – 2:00 PM',
		location: 'Convention Center, San Francisco',
		capacity: 40,
		organizerId: 'user-1',
		participants: [
			{ id: 'user-1', name: 'Alice Johnson' },
			{ id: 'user-2', name: 'Bob Smith' },
			{ id: 'user-3', name: 'Carol White' },
			{ id: 'user-4', name: 'David Lee' },
		],
	},
	{
		id: 'evt-5',
		title: 'Photography Walk',
		description: 'Explore the city with fellow photography enthusiasts and capture stunning urban shots.',
		date: 'Apr 5, 2026',
		time: '9:00 AM',
		location: 'City Park, Downtown',
		capacity: 30,
		organizerId: 'user-2',
		participants: Array.from({ length: 12 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-6',
		title: 'Cooking Masterclass',
		description: 'Learn to cook authentic Italian dishes from a professional chef in a fun group setting.',
		date: 'Apr 12, 2026',
		time: '3:00 PM',
		location: 'Culinary Studio, Midtown',
		capacity: 20,
		organizerId: 'user-3',
		participants: Array.from({ length: 8 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-7',
		title: 'Startup Pitch Night',
		description: 'Watch early-stage startups pitch their ideas to investors and fellow entrepreneurs.',
		date: 'Apr 18, 2026',
		time: '6:00 PM',
		location: 'Innovation Hub, Tech District',
		capacity: 150,
		organizerId: 'user-1',
		participants: Array.from({ length: 90 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-8',
		title: 'Yoga in the Park',
		description: 'Start your morning with a relaxing outdoor yoga session suitable for all levels.',
		date: 'Apr 22, 2026',
		time: '7:00 AM',
		location: 'Riverside Park',
		capacity: 60,
		organizerId: 'user-2',
		participants: Array.from({ length: 35 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-9',
		title: 'Book Club Meetup',
		description: "Monthly meetup to discuss this month's selected novel over coffee and good company.",
		date: 'May 3, 2026',
		time: '5:00 PM',
		location: 'The Reading Room Café',
		capacity: 25,
		organizerId: 'user-3',
		participants: Array.from({ length: 10 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
	{
		id: 'evt-10',
		title: 'Hackathon 2026',
		description: 'A 24-hour hackathon where teams compete to build innovative solutions to real-world problems.',
		date: 'May 10, 2026',
		time: '9:00 AM',
		location: 'Tech Campus, Building A',
		capacity: 120,
		organizerId: 'user-1',
		participants: Array.from({ length: 80 }, (_, i) => ({ id: `u-${i}`, name: `Participant ${i + 1}` })),
	},
]
