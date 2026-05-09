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
			id: 9,
			name: 'Saeed Bhutta',
			urduName: 'Saeed Bhutta',
			role: 'Department Coordinator',
			urduRole: 'Department Coordinator',
			qualification: 'BS Computer Science',
			urduQualification: 'BS Computer Science',
			photo: '/images/staff/saed4k.png',
			subject: 'Computer Science',
			isHod: false,
			isCoordinator: true,
			isTeachingStaff: true
		},
		staff: [
			{
				id: 7,
				name: 'Muhammad Jabbar Joyia',
				urduName: 'Muhammad Jabbar Joyia',
				role: 'Teaching Staff',
				urduRole: 'Teaching Staff',
				qualification: 'BS Computer Science',
				urduQualification: 'BS Computer Science',
				photo: '/images/staff/jabbar4k.png',
				subject: 'Computer Science',
				isHod: false,
				isCoordinator: false,
				isTeachingStaff: true
			},
			{
				id: 9,
				name: 'Saeed Bhutta',
				urduName: 'Saeed Bhutta',
				role: 'Department Coordinator',
				urduRole: 'Department Coordinator',
				qualification: 'BS Computer Science',
				urduQualification: 'BS Computer Science',
				photo: '/images/staff/saed4k.png',
				subject: 'Computer Science',
				isHod: false,
				isCoordinator: true,
				isTeachingStaff: true
			}
		]
	},
	{
		id: 'mathematics',
		databaseId: 4,
		name: 'Mathematics',
		urduName: 'ریاضی',
		coordinator: null,
		staff: [
			{
				id: 8,
				name: 'Muhammad Mushahid Hussain',
				urduName: 'Muhammad Mushahid Hussain',
				role: 'Teaching Staff',
				urduRole: 'Teaching Staff',
				qualification: 'MPhil Mathematics',
				urduQualification: 'MPhil Mathematics',
				photo: '/images/staff/mushaid hussain 4k.png',
				subject: 'Mathematics',
				isHod: false,
				isCoordinator: false,
				isTeachingStaff: true
			}
		]
	}
];
