import Ping from '@/components/Ping';
import { STARTUP_VIEWS_QUERY } from '../sanity/lib/queries';
import { client } from '@/sanity/lib/client';

const View = async ({ id }: { id: string }) => {
	const { views: totalViews } = await client
		.withConfig({
			useCdn: false,
		})
		.fetch(STARTUP_VIEWS_QUERY, { id });

    // TODO: Update the number of views
	return (
		<div>
			<div className='view-container'>
				<div className='absolute -right-2 -top-2'>
					<Ping />
				</div>
				<p className='view-text'>
					<span className='font-black'>{totalViews} views</span>
				</p>
			</div>
		</div>
	);
};

export default View;
