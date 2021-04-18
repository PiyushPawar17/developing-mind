import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import readingTime from 'reading-time';
import renderToString from 'next-mdx-remote/render-to-string';

import MDXComponents from '@components/MDXComponents';

import { FrontMatter } from '@typings/types';

const root = process.cwd();

export const getFiles = async () => fs.readdirSync(path.join(root, 'data', 'blogs'));

export const getFileBySlug = async (slug: string) => {
	const file = fs.readFileSync(path.join(root, 'data', 'blogs', `${slug}.mdx`), 'utf8');

	const { data, content } = matter(file);

	const mdxSource = await renderToString(content, {
		components: MDXComponents,
		mdxOptions: {
			remarkPlugins: [require('remark-autolink-headings'), require('remark-slug'), require('remark-code-titles')],
			rehypePlugins: [mdxPrism]
		}
	});

	return {
		mdxSource,
		frontMatter: {
			readingTime: readingTime(content),
			slug,
			...data
		}
	};
};

export const getAllFilesFrontMatter = async () => {
	const files = fs.readdirSync(path.join(root, 'data', 'blogs'));

	return files
		.map(file => {
			const fileContent = fs.readFileSync(path.join(root, 'data', 'blogs', file), 'utf8');
			const { data, content } = matter(fileContent);

			return {
				...(data as FrontMatter),
				readingTime: readingTime(content),
				slug: file.replace('.mdx', '')
			};
		})
		.sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)));
};
