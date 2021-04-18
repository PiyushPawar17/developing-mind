type ReadTimeResults = {
	text: string;
	time: number;
	words: number;
	minutes: number;
};

export type FrontMatter = {
	title: string;
	subtitle: string;
	publishedAt: string;
	slug: string;
	readingTime: ReadTimeResults;
};

export interface FrontMatterWithSlug extends FrontMatter {
	slug: string;
}
