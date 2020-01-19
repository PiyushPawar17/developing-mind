import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { formatReadingTime } from '../utils';

import '../styles/BlogCard.css';

const BlogCard = ({ slug, title, date, ttr, spoiler }) => (
	<Link className="blog-card" to={slug}>
		<h3 className="blog-card__title">{title}</h3>
		<small className="blog-card__info">
			{date} • {formatReadingTime(ttr)}
		</small>
		<p className="blog-card__spoiler">{spoiler}</p>
	</Link>
);

BlogCard.propTypes = {
	slug: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	spoiler: PropTypes.string.isRequired,
	ttr: PropTypes.number.isRequired
};

export default BlogCard;
