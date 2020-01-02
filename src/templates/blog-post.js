import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import { formatReadingTime } from '../utils';

import '../styles/Blog.css';

const BlogPostTemplate = ({ data: post, pageContext }) => {
	const { previous, next } = pageContext;
	return (
		<Layout>
			<SEO title={post.markdownRemark.frontmatter.title} />
			<article className="blog">
				<h1 className="blog__title">{post.markdownRemark.frontmatter.title}</h1>
				<small className="blog__info">
					{post.markdownRemark.frontmatter.date} • {formatReadingTime(post.markdownRemark.timeToRead)}
				</small>
				<div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
			</article>
			<section className="more-blogs">
				{previous && (
					<div className="more-blogs__prev">
						<Link to={previous.fields.slug}>&larr; {previous.frontmatter.title}</Link>
					</div>
				)}
				{next && (
					<div className="more-blogs__next">
						<Link to={next.fields.slug}>{next.frontmatter.title} &rarr;</Link>
					</div>
				)}
			</section>
		</Layout>
	);
};

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				date(formatString: "MMMM D, YYYY")
				title
			}
			timeToRead
		}
	}
`;

export default BlogPostTemplate;
