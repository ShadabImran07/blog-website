import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Create & Share
				<br className='max-md:hidden' />
				<span className='orange_gradient text-center'> Blogs</span>
			</h1>
			<p className='desc text-center'>
				Bloging World is an open-source blog hosting tool for modern world to
				discover, create and share creative blogs
			</p>
			<Feed />
		</section>
	);
};

export default Home;
