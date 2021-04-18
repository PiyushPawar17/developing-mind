import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="py-8 flex justify-between items-center flex-col md:flex-row">
			<Link href="/">
				<a className="block w-64 xs:w-72 sm:w-80 outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-body">
					<img src="/static/logo.svg" alt="Developing Mind Logo" />
				</a>
			</Link>
			<section className="flex gap-3 items-center mt-6 md:m-0">
				<a
					href="https://github.com/PiyushPawar17"
					target="_blank"
					rel="noopener noreferrer"
					className="block bg-code p-2 rounded outline-none transform transition duration-200 hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-code focus:ring-offset-2 focus:ring-offset-body"
				>
					<img src="/static/github.svg" alt="Github Logo" className="w-4 sm:w-5" />
				</a>
				<a
					href="https://dribbble.com/PiyushPawar17"
					target="_blank"
					rel="noopener noreferrer"
					className="block bg-code p-2 rounded outline-none transform transition duration-200 hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-code focus:ring-offset-2 focus:ring-offset-body"
				>
					<img src="/static/dribbble.svg" alt="Dribbble Logo" className="w-4 sm:w-5" />
				</a>
				<a
					href="https://twitter.com/PiyushPawar_17"
					target="_blank"
					rel="noopener noreferrer"
					className="block bg-code p-2 rounded outline-none transform transition duration-200 hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-code focus:ring-offset-2 focus:ring-offset-body"
				>
					<img src="/static/twitter.svg" alt="Twitter Logo" className="w-4 sm:w-5" />
				</a>
				<a
					href="https://piyushpawar.dev"
					target="_blank"
					rel="noopener noreferrer"
					className="block bg-code p-2 rounded outline-none transform transition duration-200 hover:scale-110 focus:scale-110 focus:ring-2 focus:ring-code focus:ring-offset-2 focus:ring-offset-body"
				>
					<img src="/static/globe.svg" alt="Website Link" className="w-4 sm:w-5" />
				</a>
			</section>
		</nav>
	);
};

export default Navbar;
