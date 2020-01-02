import React from 'react';
import PropTypes from 'prop-types';

import GitHub from '../img/github.svg';
import Dribbble from '../img/dribbble.svg';
import LinkedIn from '../img/linkedin.svg';
import Twitter from '../img/twitter.svg';

import '../styles/Header.css';

const Header = () => (
	<header className="header">
		<h1 className="header__title">
			Hello, I'm <span className="header__name">Piyush Pawar</span>
		</h1>
		<h2 className="header__description">
			I'm a <span className="header__bold">Front-end developer</span> passionate about creating delightful
			interfaces. Here, I'll share things that I learned while exploring Front-end, Back-end, UI/UX design, Tech
			and Non-tech. Hope you'll find this helpful. 😄
		</h2>
		<section className="header__follow">
			<p>Follow Me</p>
			<section className="header__icons">
				<a
					className="header__icon"
					href="https://github.com/PiyushPawar17"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={GitHub} alt="GitHub Logo" />
				</a>
				<a
					className="header__icon"
					href="https://dribbble.com/PiyushPawar17"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={Dribbble} alt="Dribbble Logo" />
				</a>
				<a
					className="header__icon"
					href="https://linkedin.com/in/piyush-pawar"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={LinkedIn} alt="LinkedIn Logo" />
				</a>
				<a
					className="header__icon"
					href="https://twitter.com/PiyushPawar_17"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={Twitter} alt="Twitter Logo" />
				</a>
			</section>
		</section>
	</header>
);

Header.propTypes = {
	siteTitle: PropTypes.string,
	siteDescription: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ``,
	siteDescription: ``
};

export default Header;
