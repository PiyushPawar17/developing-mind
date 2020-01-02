import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import '../styles/NotFound.css';

const NotFoundPage = () => {
	const data = useStaticQuery(graphql`
		{
			allMarkdownRemark(limit: 3, sort: { fields: frontmatter___date, order: DESC }) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
				}
			}
		}
	`);

	return (
		<Layout>
			<SEO title="Blog Not Found" />
			<header>
				<h1 className="not-found__header">Looks like you&#39;re lost</h1>
				<p className="not-found__info">
					The blog that you&#39;re trying to read doesn&#39;t exist... the sadness
					<span role="img" aria-label="Sad Emoji">
						😔
					</span>
					.
				</p>
			</header>
			<section className="not-found__suggestions">
				<p>Here are some blogs you can read.</p>
				{data.allMarkdownRemark.edges.map(({ node: blog }) => (
					<Link to={blog.fields.slug} key={blog.frontmatter.title}>
						{blog.frontmatter.title}
					</Link>
				))}
			</section>
			<p>
				Or go back to{' '}
				<Link to="/" className="not-found__back">
					Homepage
				</Link>
			</p>
		</Layout>
	);
};

export default NotFoundPage;
