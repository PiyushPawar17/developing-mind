import Container from '@layouts/Container';

const Custom500 = () => {
	return (
		<Container
			title="500 Internal Server Error | Developing Mind"
			description="500 - Internal Server Error. Server is down"
		>
			<section className="mt-10">
				<img
					src="/static/500.svg"
					alt="500 Internal Server Error"
					className="w-60 md:w-80 mb-8 md:mb-12 mx-auto"
				/>
				<h1 className="text-3xl md:text-5xl text-center font-bold">Something went wrong!</h1>
				<p className="text-lg text-center my-8">
					While the issue is fixed, have a look at my
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="mx-1 cursor-pointer text-primary outline-none hover:underline focus:underline"
					>
						personal website
					</a>
					:&#41;
				</p>
			</section>
		</Container>
	);
};

export default Custom500;
