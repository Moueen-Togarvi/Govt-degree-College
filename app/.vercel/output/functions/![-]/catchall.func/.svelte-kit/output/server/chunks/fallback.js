//#region src/lib/content/fallback.ts
var fallbackAnnouncements = [
	{
		id: 1,
		date: "May 08, 2026",
		isoDate: "2026-05-08T00:00:00.000Z",
		title: "Admissions Open for 11th Class Session 2026",
		description: "Admissions are now open for 11th class. Students can submit their documents and application forms through the college admission office.",
		category: "Admissions"
	},
	{
		id: 2,
		date: "May 06, 2026",
		isoDate: "2026-05-06T00:00:00.000Z",
		title: "BS Morning and Evening Admissions Notice",
		description: "Admissions are open for BS programs affiliated with KFUEIT in both morning and evening shifts. Contact the college for eligibility and fee details.",
		category: "Admissions"
	},
	{
		id: 3,
		date: "May 03, 2026",
		isoDate: "2026-05-03T00:00:00.000Z",
		title: "Important Notice for Intermediate Applicants",
		description: "Applicants for 11th and 12th classes should bring their previous academic documents and passport-size photographs at the time of submission.",
		category: "Notice"
	}
];
var fallbackTickerAnnouncements = [
	{
		id: 1,
		title: "11th Class admissions are now open",
		href: "/news/announcements",
		sortOrder: 1
	},
	{
		id: 2,
		title: "BS morning and evening admissions notice",
		href: "/news/announcements",
		sortOrder: 2
	},
	{
		id: 3,
		title: "Intermediate applicants should submit required documents",
		href: "/news/announcements",
		sortOrder: 3
	}
];
var fallbackNoticeBoardItems = [
	{
		id: 1,
		title: "11th Admissions Open",
		message: "Admissions for 11th class are now open. Submit your documents at the college admission office.",
		tag: "Admissions",
		date: "May 08, 2026",
		isoDate: "2026-05-08T00:00:00.000Z",
		sortOrder: 1,
		expiryDate: null,
		expiryIsoDate: null
	},
	{
		id: 2,
		title: "BS Morning & Evening Admissions",
		message: "BS admissions are open in both morning and evening shifts under KFUEIT affiliation.",
		tag: "BS Notice",
		date: "May 06, 2026",
		isoDate: "2026-05-06T00:00:00.000Z",
		sortOrder: 2,
		expiryDate: null,
		expiryIsoDate: null
	},
	{
		id: 3,
		title: "Bring Required Documents",
		message: "Intermediate applicants should bring previous result cards, photographs, and B-Form copy during admission.",
		tag: "Important",
		date: "May 03, 2026",
		isoDate: "2026-05-03T00:00:00.000Z",
		sortOrder: 3,
		expiryDate: null,
		expiryIsoDate: null
	}
];
var fallbackEvents = [{
	id: 1,
	title: "Annual Prize Distribution 2026",
	date: "Nov 25, 2026",
	isoDate: "2026-11-25T00:00:00.000Z",
	time: "10:00 AM",
	location: "College Main Auditorium",
	imageUrl: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg",
	status: "Upcoming"
}, {
	id: 2,
	title: "Seminar on Artificial Intelligence",
	date: "Dec 05, 2026",
	isoDate: "2026-12-05T00:00:00.000Z",
	time: "11:30 AM",
	location: "CS Department Seminar Hall",
	imageUrl: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg",
	status: "Upcoming"
}];
var fallbackResults = [
	{
		id: 1,
		title: "BS Computer Science (2nd Semester) - Spring 2026",
		date: "Oct 20, 2026",
		isoDate: "2026-10-20T00:00:00.000Z",
		type: "Semester",
		fileUrl: null
	},
	{
		id: 2,
		title: "BS English (4th Semester) - Spring 2026",
		date: "Oct 18, 2026",
		isoDate: "2026-10-18T00:00:00.000Z",
		type: "Semester",
		fileUrl: null
	},
	{
		id: 3,
		title: "Intermediate Part-I (Mock Exams)",
		date: "Oct 10, 2026",
		isoDate: "2026-10-10T00:00:00.000Z",
		type: "Annual",
		fileUrl: null
	},
	{
		id: 4,
		title: "BS Zoology (1st Semester) - Spring 2026",
		date: "Oct 05, 2026",
		isoDate: "2026-10-05T00:00:00.000Z",
		type: "Semester",
		fileUrl: null
	}
];
var fallbackQuickLinks = [
	{
		id: 1,
		title: "Scholarship Facility",
		description: "We offer merit-based and government scholarships to support bright students.",
		href: "/admissions/scholarships",
		iconName: "graduation-cap"
	},
	{
		id: 2,
		title: "Skilled Lecturers",
		description: "Our faculty consists of highly qualified professors dedicated to your success.",
		href: "/about/faculty",
		iconName: "users"
	},
	{
		id: 3,
		title: "Book Library Facility",
		description: "Access thousands of books, journals, and digital resources in our central library.",
		href: "/resources",
		iconName: "library"
	},
	{
		id: 4,
		title: "Affordable Education",
		description: "High-quality government-standard education at the most affordable fee structure.",
		href: "/admissions/fee-structure",
		iconName: "banknote"
	}
];
//#endregion
export { fallbackResults as a, fallbackQuickLinks as i, fallbackEvents as n, fallbackTickerAnnouncements as o, fallbackNoticeBoardItems as r, fallbackAnnouncements as t };
