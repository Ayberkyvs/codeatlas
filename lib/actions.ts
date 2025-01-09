'use server';

import { auth } from '@/auth';
import { parseResponse } from '@/lib/utils';
import { writeClient } from '@/sanity/lib/write-client';
import slugify from 'slugify';
export const createPitch = async (
	state: any,
	pitch: string,
	formData: FormData,
) => {
	const session = await auth();
	if (!session)
		return parseResponse({ status: 'ERROR', error: 'Authentication Failed' });
	const { title, description, category, link } = Object.fromEntries(
		Array.from(formData).filter(([key]) => key !== 'pitch'),
	);
	const slug = slugify(title as string, { lower: true, strict: true });
	try {
        const startup = {
            title,
            description,
            category,
            link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        }
        const result = await writeClient.create({_type: 'startup', ...startup});
        return parseResponse({ status: 'SUCCESS', error: '', ...result });
	} catch (error) {
		return parseResponse({ status: 'ERROR', error: JSON.stringify(error) });
	}
};
