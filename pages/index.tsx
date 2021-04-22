import { GetStaticProps } from 'next';

import Container from '@layouts/Container';
import BlogCard from '@components/BlogCard';

import { getAllFilesFrontMatter } from '@lib/mdx';

import { FrontMatterWithSlug } from '@typings/types';

interface IndexPageProps {
	blogs: FrontMatterWithSlug[];
}

const IndexPage: React.FC<IndexPageProps> = ({ blogs }) => {
	return (
		<Container>
			<section className="mt-6 md:mt-12">
				<h2 className="uppercase text-lg font-bold mb-8">Featured</h2>
				<section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12">
					{blogs
						.filter(blog => blog.slug === 'trying-out-zustand' || blog.slug === 'the-bem-architecture')
						.map(blog => (
							<BlogCard key={blog.slug} {...blog} isFeatured />
						))}
				</section>
			</section>
			<section className="mt-12">
				<h2 className="uppercase text-lg font-bold mb-8">All Blogs</h2>
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 sm:gap-x-8 md:gap-x-10 gap-y-14">
					{blogs.map(blog => (
						<BlogCard key={blog.slug} {...blog} />
					))}
				</section>
			</section>
		</Container>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const blogs = await getAllFilesFrontMatter();

	return {
		redirect: {
			destination: 'https://www.piyushpawar.dev/blog',
			permanent: true
		},
		props: {
			blogs
		}
	};
};

export default IndexPage;
