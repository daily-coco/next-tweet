import BtnAccess from '@/components/button/button-access';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import AddTweet from '@/components/tweet-add';
import TweetList from '@/components/tweet-list';
import { getInitialTweet, getTweetsByUsername } from '@/service/tweetService';
import Link from 'next/link';

async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });
  if (user) {
    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/login');
  };
  // all
  const allTweets = await getInitialTweet();
  const userTweets = await getTweetsByUsername(user.username);
  return (
    <main className='p-10'>
      <header className='flex flex-col w-full'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-[26px] font-[700]'>
              {user ? user?.username : 'Now Tweet'}
            </h1>
          </div>

          <div className='flex gap-2'>
            {user && (
              <>
                <Link href={`/users/${user.username}/edit`}>
                  <BtnAccess text='프로필 수정' />
                </Link>
                <form action={logOut}>
                  <BtnAccess text='LogOut' />
                </form>
              </>
            )}
            <Link href={`/search`}>
              <BtnAccess text='검색' />
            </Link>
          </div>
        </div>
      </header>
      <article className='mt-20'>
        <section className='flex flex-col gap-5'>
          <AddTweet />
          <TweetList initialTweets={user ? userTweets : allTweets} />
        </section>
      </article>
    </main>
  );
}
