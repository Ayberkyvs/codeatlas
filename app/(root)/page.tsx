import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams)?.query || '';
	const posts = [
		{
			_id: 1,
			title: 'Startup 1',
			description: 'Description of startup 1',
			category: 'Technology',
			views: 55,
			_createdAt: new Date().toISOString(),
			image: 'https://placehold.co/150',
			author: {
				_id: 1,
				name: 'Author 1',
			},
		},
	];
	return (
		<>
			<section className='pink_container'>
				<h1 className='heading'>
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>

				<p className='sub-heading !max-w-3xl'>
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions.
				</p>

				<SearchForm query={query} />
			</section>
			<section className='section_container'>
				<p className='text-30-semibold'>
					{query ? `Search results for "${query}"` : 'All Startups'}
				</p>

				<ul className='card_grid mt-7'>
					{posts?.length > 0 ? (
						posts.map((post: StartupCardType) => <StartupCard key={post._id} post={post}/>)
					) : (
						<p className='no-results'>No startups found.</p>
					)}
				</ul>
			</section>
		</>
	);
}
