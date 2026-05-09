export type Announcement = {
	id: number;
	title: string;
	description: string;
	category: string;
	date: string;
	isoDate: string;
};

export type NoticeBoardItem = {
	id: number;
	title: string;
	message: string;
	tag: string;
	date: string;
	isoDate: string;
	sortOrder: number;
	expiryDate: string | null;
	expiryIsoDate: string | null;
};

export type LatestNewsItem = {
	id: number;
	title: string;
	href: string;
	sortOrder: number;
};

export type TickerAnnouncement = LatestNewsItem;

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
