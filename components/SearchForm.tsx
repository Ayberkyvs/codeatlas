import React from 'react';
import Form from 'next/form';
import SearchFormReset from '@/components/SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({query}: {query: string}) => {
	return (
		<Form action='/' scroll={false} className='search-form'>
			<input
				name='query'
				defaultValue={query}
				className='search-input placeholder:text-16-medium xs:placeholder:text-20-medium'
				placeholder='Search for startups'
			/>

			<div className='flex gap-2'>
				{query && <SearchFormReset />}
				<button type='submit' className='search-btn text-white' title="Search">
					<Search />
				</button>
			</div>
		</Form>
	);
};

export default SearchForm;
