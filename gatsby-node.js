const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;

	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode });
		createNodeField({ node, name: 'slug', value: slug });
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = path.resolve('./src/templates/blog-post.js');
	const result = await graphql(`
		{
			allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
				edges {
					node {
						fields {
							slug
						}
					}
					next {
						frontmatter {
							title
						}
						fields {
							slug
						}
					}
					previous {
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

	if (result.errors) {
		throw result.errors;
	}

	const posts = result.data.allMarkdownRemark.edges;

	posts.forEach(post => {
		createPage({
			path: post.node.fields.slug,
			component: blogPost,
			context: {
				slug: post.node.fields.slug,
				previous: post.previous,
				next: post.next
			}
		});
	});
};
