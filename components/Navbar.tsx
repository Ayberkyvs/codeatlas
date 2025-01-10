import { auth, signIn, signOut } from '@/auth';
import { BadgePlus, Github, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
const Navbar = async () => {
	const session = await auth();

	return (
		<header className='sticky top-0 bg-white font-work-sans shadow-md'>
			<div className='max-w-7xl w-full px-5 py-3 place-self-center'>
			<nav className='flex items-center justify-between'>
				<Link href='/'>
					<Image
						src='/logo.png'
						alt='Code Atlas Brand Logo'
						width={144}
						height={30}
					/>
				</Link>

				<div className='flex items-center justify-center gap-5 text-black'>
					{session && session?.user ? (
						<>
							<Link href='/startup/create'>
								<span className='max-sm:hidden'>Create</span>
								<BadgePlus className='size-6 sm:hidden' />
							</Link>
							<form
								action={async () => {
									'use server';
									await signOut({ redirectTo: '/' });
								}}
								className='flex items-center'
							>
								<button type='submit'>
									<span className='max-sm:hidden'>Logout</span>
									<LogOut className='size-6 text-red-500 sm:hidden' />
								</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar className='size-10'>
									<AvatarImage
										src={session?.user?.image || ''}
										alt={`${session?.user?.name} avatar` || ''}
									/>
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<form
							action={async () => {
								'use server';

								await signIn('github');
							}}
						>
							<Button
								type='submit'
								className='bg-black text-white hover:cursor-pointer'
							>
								<Github className='text-white' />
								<span className='text-14-medium text-white'>Login</span>
							</Button>
						</form>
					)}
				</div>
			</nav>
			</div>
		</header>
	);
};

export default Navbar;
