import { useEffect } from 'react';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { parseISO, format } from 'date-fns';

import Container from '@layouts/Container';
import ViewCounter from '@components/ViewCounter';

import { addViewsToBlog } from '@lib/queryHelpers';

import { FrontMatter } from '@typings/types';

interface BlogLayoutProps {
	frontMatter: FrontMatter;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, frontMatter }) => {
	const publishedAt = new Date(frontMatter.publishedAt).toISOString();
	const bannerImagePath = `/static/blog-images/${frontMatter.slug}/banner.png`;

	const { mutate } = useMutation(addViewsToBlog);
	useEffect(() => {
		mutate({ slug: frontMatter.slug });
	}, []);

	return (
		<Container
			title={`${frontMatter.title} | Developing Mind`}
			description={frontMatter.subtitle}
			image={`https://blog.piyushpawar.dev${bannerImagePath}`}
			date={publishedAt}
			type="article"
		>
			<article>
				<header className="my-4 md:my-6 lg:my-10">
					<time
						dateTime={publishedAt}
						className="block text-xs md:text-xs text-center uppercase text-white opacity-70"
					>
						Published at {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
					</time>
					<h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mt-4 lg:mt-6 mb-4">
						{frontMatter.title}
					</h1>
					<p className="text-center text-white text-sm opacity-70">
						{frontMatter.readingTime.text} <ViewCounter slug={frontMatter.slug} />
					</p>
				</header>
				<div className="mb-10">
					<Image
						src={bannerImagePath}
						alt={`${frontMatter.title} Banner`}
						width={1280}
						height={720}
						layout="responsive"
						quality={100}
						priority
					/>
				</div>
				<section className="prose lg:prose-lg mx-auto">{children}</section>
			</article>
		</Container>
	);
};

export default BlogLayout;
