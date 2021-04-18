import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '@layouts/Container';

const Custom404 = () => {
	const router = useRouter();

	return (
		<Container title="404 Not Found | Developing Mind" description={`${router.asPath} does not exist`}>
			<main className="mt-24">
				<section>
					<img src="/static/404.svg" alt="404 Not Found" className="w-60 md:w-80 mb-8 md:mb-12 mx-auto" />
					<h1 className="text-3xl md:text-5xl text-center font-bold">Not Found</h1>
					<p className="text-lg my-8">This blog does not exist. Try reading one of these:</p>
					<ul className="space-y-2 text-sm md:text-base text-primary">
						<li>
							<Link href="/trying-out-zustand">
								<a className="outline-none hover:underline focus:underline">Trying out Zustand</a>
							</Link>
						</li>
						<li>
							<Link href="/ui-design-for-frontend-developers">
								<a className="outline-none hover:underline focus:underline">
									UI Design for Front-end developers
								</a>
							</Link>
						</li>
						<li>
							<Link href="/understanding-javascript-objects-part-1">
								<a className="outline-none hover:underline focus:underline">
									Understanding JavaScript Objects (Part 1)
								</a>
							</Link>
						</li>
					</ul>
				</section>
			</main>
		</Container>
	);
};

export default Custom404;
