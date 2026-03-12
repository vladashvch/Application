export const events = [
  {
    id: '1',
    title: 'React Meetup Kyiv',
    description: 'Monthly React developers meetup in Kyiv',
    date: new Date('2026-03-14T18:00:00'),
    location: 'Kyiv, Hub One',
    capacity: 2,
    isPublic: true,
    organizerId: '1', // Alice
  },
  {
    id: '2',
    title: 'NestJS Workshop',
    description: 'Hands-on NestJS workshop for backend developers',
    date: new Date('2026-03-20T10:00:00'),
    location: 'Kyiv, IT Cluster',
    capacity: 30,
    isPublic: true,
    organizerId: '2', // Bob
  },
  {
    id: '3',
    title: 'Private Team Sync',
    description: 'Internal team synchronization meeting',
    date: new Date('2026-03-22T09:00:00'),
    location: 'Online, Zoom',
    capacity: null, // No limit
    isPublic: false,
    organizerId: '3', // Carol
  },
  {
    id: '4',
    title: 'Public Team Sync',
    description: 'Internal team synchronization meeting',
    date: new Date('2026-03-07T09:00:00'),
    location: 'Online, Zoom',
    capacity: null,
    isPublic: true,
    organizerId: '3', // Carol
  },
];
