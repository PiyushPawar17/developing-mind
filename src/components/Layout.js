/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Header from './Header';

import '../styles/Layout.css';

const Layout = ({ children, isIndexPage }) => (
	<>
		<main className="layout">
			<Navbar />
			{isIndexPage && <Header />}
			{children}
		</main>
	</>
);

Layout.defaultProps = {
	isIndexPage: false
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	isIndexPage: PropTypes.bool.isRequired
};

export default Layout;
