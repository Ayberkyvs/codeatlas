import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
	return (
		<div className='flex justify-center items-center w-full min-h-screen bg-white'>
            <Loader2 className='size-10 text-primary' />
		</div>
	);
};

export default Loading;
