export type Department = {
	id: number;
	name: string;
	slug: string;
	urduName: string;
};

export type FacultyMember = {
	id: number;
	departmentId: number;
	departmentName: string;
	departmentSlug: string;
	name: string;
	education: string;
	subject: string;
	imageUrl: string;
	isHod: boolean;
	isCoordinator: boolean;
	isTeachingStaff: boolean;
};

export type FacultyDirectoryMember = {
	id: number;
	name: string;
	urduName: string;
	role: string;
	urduRole: string;
	qualification: string;
	urduQualification: string;
	photo: string;
	subject: string;
	isHod: boolean;
	isCoordinator: boolean;
	isTeachingStaff: boolean;
};

export type FacultyDirectoryDepartment = {
	id: string;
	databaseId: number;
	name: string;
	urduName: string;
	coordinator: FacultyDirectoryMember | null;
	staff: FacultyDirectoryMember[];
};
