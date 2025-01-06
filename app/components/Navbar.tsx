import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
const Navbar = async () => {
	const session = await auth();

	return (
		<header className='bg-white px-5 py-3 font-work-sans shadow-sm'>
			<nav className='flex items-center justify-between'>
				<Link href='/'>
					<Image
						src='/logo.png'
						alt='Code Atlas Brand Logo'
						width={144}
						height={30}
					/>
				</Link>

				<div className='flex items-center gap-5 text-black'>
					{session && session?.user ? (
						<>
							<Link href='/startup'>
								<span>Create</span>
							</Link>
							<button
								onClick={async () => {
									'use server';
									await signOut({ redirectTo: '/' });
								}}
								type='button'
							>
								<span>Logout</span>
							</button>

							<Link href={`/user/${session?.user?.id}`}>
								<span>{session?.user?.name}</span>
							</Link>
						</>
					) : (
						<button
							onClick={async () => {
								'use server';

								await signIn('github');
							}}
							type='button'
						>
							<span>Login</span>
						</button>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
