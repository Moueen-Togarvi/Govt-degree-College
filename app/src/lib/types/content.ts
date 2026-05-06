export type Announcement = {
	id: number;
	title: string;
	description: string;
	category: string;
	date: string;
	isoDate: string;
};

export type TickerAnnouncement = {
	id: number;
	title: string;
	category: string;
	href: string;
};

export type CollegeEvent = {
	id: number;
	title: string;
	date: string;
	isoDate: string;
	time: string;
	location: string;
	imageUrl: string;
	status: string;
};

export type ExamResult = {
	id: number;
	title: string;
	date: string;
	isoDate: string;
	type: string;
	fileUrl: string | null;
};

export type QuickLink = {
	id: number;
	title: string;
	description: string;
	href: string;
	iconName: string;
};
