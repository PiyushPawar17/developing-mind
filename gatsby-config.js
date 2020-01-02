module.exports = {
	siteMetadata: {
		title: `Developing Mind`,
		description: `Personal Blog by Piyush Pawar`,
		author: `Piyush Pawar`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/src/posts`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: `language-`
						}
					},
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`
						}
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 850
						}
					}
				]
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Blog.js`,
				short_name: `Blog.js`,
				start_url: `/`,
				background_color: `#282c35`,
				theme_color: `#08a6e2`,
				display: `minimal-ui`,
				icon: `src/img/favicon.png` // This path is relative to the root of the site.
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	]
};
