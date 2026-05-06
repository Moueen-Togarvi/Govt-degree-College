import type { Announcement, CollegeEvent, ExamResult, QuickLink, TickerAnnouncement } from '$lib/types/content';

export const fallbackAnnouncements: Announcement[] = [
	{
		id: 1,
		date: 'Oct 25, 2026',
		isoDate: '2026-10-25T00:00:00.000Z',
		title: 'Admissions Open for BS Programs Fall 2026',
		description:
			'Applications are invited for admission to various BS programs affiliated with KFUEIT. Last date to apply is Nov 15, 2026.',
		category: 'Admissions'
	},
	{
		id: 2,
		date: 'Oct 20, 2026',
		isoDate: '2026-10-20T00:00:00.000Z',
		title: 'Mid-Term Examination Schedule Announced',
		description:
			'The mid-term exams for 11th and 12th classes will commence from Nov 1, 2026. Check the datesheet on the portal.',
		category: 'Exams'
	},
	{
		id: 3,
		date: 'Oct 15, 2026',
		isoDate: '2026-10-15T00:00:00.000Z',
		title: 'Annual Sports Week Postponed',
		description:
			'Due to unforeseen weather conditions, the annual sports week has been postponed to next month.',
		category: 'Events'
	}
];

export const fallbackTickerAnnouncements: TickerAnnouncement[] = fallbackAnnouncements.map((item) => ({
	id: item.id,
	title: item.title,
	category: item.category,
	href: '/news/announcements'
}));

export const fallbackEvents: CollegeEvent[] = [
	{
		id: 1,
		title: 'Annual Prize Distribution 2026',
		date: 'Nov 25, 2026',
		isoDate: '2026-11-25T00:00:00.000Z',
		time: '10:00 AM',
		location: 'College Main Auditorium',
		imageUrl: '/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg',
		status: 'Upcoming'
	},
	{
		id: 2,
		title: 'Seminar on Artificial Intelligence',
		date: 'Dec 05, 2026',
		isoDate: '2026-12-05T00:00:00.000Z',
		time: '11:30 AM',
		location: 'CS Department Seminar Hall',
		imageUrl: '/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg',
		status: 'Upcoming'
	}
];

export const fallbackResults: ExamResult[] = [
	{
		id: 1,
		title: 'BS Computer Science (2nd Semester) - Spring 2026',
		date: 'Oct 20, 2026',
		isoDate: '2026-10-20T00:00:00.000Z',
		type: 'Semester',
		fileUrl: null
	},
	{
		id: 2,
		title: 'BS English (4th Semester) - Spring 2026',
		date: 'Oct 18, 2026',
		isoDate: '2026-10-18T00:00:00.000Z',
		type: 'Semester',
		fileUrl: null
	},
	{
		id: 3,
		title: 'Intermediate Part-I (Mock Exams)',
		date: 'Oct 10, 2026',
		isoDate: '2026-10-10T00:00:00.000Z',
		type: 'Annual',
		fileUrl: null
	},
	{
		id: 4,
		title: 'BS Zoology (1st Semester) - Spring 2026',
		date: 'Oct 05, 2026',
		isoDate: '2026-10-05T00:00:00.000Z',
		type: 'Semester',
		fileUrl: null
	}
];

export const fallbackQuickLinks: QuickLink[] = [
	{
		id: 1,
		title: 'Scholarship Facility',
		description:
			'We offer merit-based and government scholarships to support bright students.',
		href: '/admissions/scholarships',
		iconName: 'graduation-cap'
	},
	{
		id: 2,
		title: 'Skilled Lecturers',
		description:
			'Our faculty consists of highly qualified professors dedicated to your success.',
		href: '/about/faculty',
		iconName: 'users'
	},
	{
		id: 3,
		title: 'Book Library Facility',
		description:
			'Access thousands of books, journals, and digital resources in our central library.',
		href: '/resources',
		iconName: 'library'
	},
	{
		id: 4,
		title: 'Affordable Education',
		description:
			'High-quality government-standard education at the most affordable fee structure.',
		href: '/admissions/fee-structure',
		iconName: 'banknote'
	}
];
