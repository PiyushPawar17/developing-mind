import { QueryFunction, MutateFunction } from 'react-query';

type Views = {
	views: number;
};

export const getBlogViews: QueryFunction<Views> = async params => {
	const [slug] = params.queryKey as string[];

	const res = await fetch(slug);

	return res.json();
};

export const addViewsToBlog: MutateFunction<void, unknown, { slug: string }> = async ({ slug }) => {
	await fetch(`/api/views/${slug}`, {
		method: 'POST'
	});
};
