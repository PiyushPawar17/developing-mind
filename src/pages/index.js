import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';

import '../styles/IndexPage.css';

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query BlogQuery {
			allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
				edges {
					node {
						frontmatter {
							date(formatString: "MMMM D, YYYY")
							spoiler
							title
						}
						timeToRead
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	const blogs = data.allMarkdownRemark.edges.map(({ node: blog }) => (
		<BlogCard
			key={blog.frontmatter.title}
			slug={blog.fields.slug}
			title={blog.frontmatter.title}
			date={blog.frontmatter.date}
			ttr={blog.timeToRead}
			spoiler={blog.frontmatter.spoiler}
		/>
	));

	return (
		<Layout isIndexPage>
			<SEO />
			<main className="index-page">
				<h1 className="index-page__heading">Blog</h1>
				<section>{blogs}</section>
			</main>
		</Layout>
	);
};

export default IndexPage;
