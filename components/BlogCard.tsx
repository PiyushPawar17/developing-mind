import Link from 'next/link';
import clsx from 'clsx';

import ViewCounter from '@components/ViewCounter';

import { FrontMatterWithSlug } from '@typings/types';

interface BlogCardProps extends FrontMatterWithSlug {
	isFeatured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, subtitle, readingTime, isFeatured = false }) => {
	return (
		<Link href={`/${slug}`}>
			<a
				title={title}
				className="outline-none focus:ring-2 ring-primary ring-offset-4 focus:ring-offset-body blog-card"
			>
				<div className="overflow-hidden">
					<img
						src={`/static/blog-images/${slug}/banner.png`}
						alt={`${title} Banner`}
						className="blog-card__image"
					/>
				</div>
				<section
					className={clsx({
						'mt-4 md:mt-2 lg:mt-4': isFeatured,
						'mt-3 sm:mt-2 md:mt-3': !isFeatured
					})}
				>
					<small
						className={clsx('block opacity-80', {
							'text-sm md:text-xs lg:text-sm mb-3': isFeatured,
							'text-sm sm:text-xs mb-2': !isFeatured
						})}
					>
						{readingTime.text} <ViewCounter slug={slug} />
					</small>
					<h3
						className={clsx('font-bold overflow-hidden overflow-ellipsis whitespace-nowrap', {
							'text-xl md:text-lg lg:text-xl': isFeatured,
							'text-lg sm:text-base md:text-lg': !isFeatured
						})}
					>
						{title}
					</h3>
					<p
						className={clsx('overflow-hidden overflow-ellipsis whitespace-nowrap', {
							'text-base md:text-sm lg:text-base': isFeatured,
							'text-sm sm:text-xs md:text-sm': !isFeatured
						})}
					>
						{subtitle}
					</p>
				</section>
			</a>
		</Link>
	);
};

export default BlogCard;
