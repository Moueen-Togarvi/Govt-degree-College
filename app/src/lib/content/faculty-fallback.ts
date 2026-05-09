import type { FacultyDirectoryDepartment } from '$lib/types/faculty';

export const defaultFacultyImage =
	'/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg';

export const fallbackFacultyDepartments: FacultyDirectoryDepartment[] = [
	{
		id: 'computer-science',
		databaseId: 1,
		name: 'Computer Science',
		urduName: 'کمپیوٹر سائنس',
		coordinator: {
			id: 2,
			name: 'Dr. Ahmed Hassan',
			urduName: 'Dr. Ahmed Hassan',
			role: 'Department Coordinator',
			urduRole: 'Department Coordinator',
			qualification: 'PhD AI',
			urduQualification: 'PhD AI',
			photo: '/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg',
			subject: 'Artificial Intelligence',
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [
			{
				id: 1,
				name: 'Prof. Muhammad Zahid',
				urduName: 'Prof. Muhammad Zahid',
				role: 'HOD',
				urduRole: 'HOD',
				qualification: 'MS Computer Science',
				urduQualification: 'MS Computer Science',
				photo: '/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg',
				subject: 'Computer Science',
				isHod: true,
				isCoordinator: false,
				isTeachingStaff: true
			},
			{
				id: 2,
				name: 'Dr. Ahmed Hassan',
				urduName: 'Dr. Ahmed Hassan',
				role: 'Department Coordinator',
				urduRole: 'Department Coordinator',
				qualification: 'PhD AI',
				urduQualification: 'PhD AI',
				photo: '/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg',
				subject: 'Artificial Intelligence',
				isHod: false,
				isCoordinator: true,
				isTeachingStaff: true
			}
		]
	},
	{
		id: 'english',
		databaseId: 2,
		name: 'English',
		urduName: 'انگلش',
		coordinator: {
			id: 4,
			name: 'Ms. Amna Bibi',
			urduName: 'Ms. Amna Bibi',
			role: 'Department Coordinator',
			urduRole: 'Department Coordinator',
			qualification: 'M.Phil Linguistics',
			urduQualification: 'M.Phil Linguistics',
			photo: '/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg',
			subject: 'English',
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [
			{
				id: 3,
				name: 'Prof. Sajjad Haider',
				urduName: 'Prof. Sajjad Haider',
				role: 'HOD',
				urduRole: 'HOD',
				qualification: 'MA English Literature',
				urduQualification: 'MA English Literature',
				photo: '/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg',
				subject: 'English Literature',
				isHod: true,
				isCoordinator: false,
				isTeachingStaff: true
			},
			{
				id: 4,
				name: 'Ms. Amna Bibi',
				urduName: 'Ms. Amna Bibi',
				role: 'Department Coordinator',
				urduRole: 'Department Coordinator',
				qualification: 'M.Phil Linguistics',
				urduQualification: 'M.Phil Linguistics',
				photo: '/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg',
				subject: 'English',
				isHod: false,
				isCoordinator: true,
				isTeachingStaff: true
			}
		]
	},
	{
		id: 'urdu',
		databaseId: 3,
		name: 'Urdu',
		urduName: 'اردو',
		coordinator: {
			id: 6,
			name: 'Ms. Naila Ashraf',
			urduName: 'Ms. Naila Ashraf',
			role: 'Department Coordinator',
			urduRole: 'Department Coordinator',
			qualification: 'M.Phil Urdu',
			urduQualification: 'M.Phil Urdu',
			photo: '/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg',
			subject: 'Urdu',
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [
			{
				id: 5,
				name: 'Prof. Khalid Mahmood',
				urduName: 'Prof. Khalid Mahmood',
				role: 'HOD',
				urduRole: 'HOD',
				qualification: 'MA Urdu',
				urduQualification: 'MA Urdu',
				photo: '/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg',
				subject: 'Urdu',
				isHod: true,
				isCoordinator: false,
				isTeachingStaff: true
			},
			{
				id: 6,
				name: 'Ms. Naila Ashraf',
				urduName: 'Ms. Naila Ashraf',
				role: 'Department Coordinator',
				urduRole: 'Department Coordinator',
				qualification: 'M.Phil Urdu',
				urduQualification: 'M.Phil Urdu',
				photo: '/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg',
				subject: 'Urdu',
				isHod: false,
				isCoordinator: true,
				isTeachingStaff: true
			}
		]
	}
];
