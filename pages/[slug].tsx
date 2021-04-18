import { GetStaticPaths, GetStaticProps } from 'next';
import hydrate from 'next-mdx-remote/hydrate';

import BlogLayout from '@layouts/BlogLayout';
import MDXComponents from '@components/MDXComponents';

import { getFiles, getFileBySlug } from '@lib/mdx';

import { MdxRemote } from 'next-mdx-remote/types';
import { FrontMatter } from '@typings/types';

interface BlogPageProps {
	mdxSource: MdxRemote.Source;
	frontMatter: FrontMatter;
}

const BlogPage: React.FC<BlogPageProps> = ({ mdxSource, frontMatter }) => {
	const content = hydrate(mdxSource, {
		components: MDXComponents
	});

	return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getFiles();

	return {
		paths: posts.map(post => ({
			params: {
				slug: post.replace(/\.mdx/, '')
			}
		})),
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const post = await getFileBySlug(params!.slug as string);

	return { props: post };
};

export default BlogPage;
