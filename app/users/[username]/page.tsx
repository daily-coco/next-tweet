import BtnAccess from '@/components/button/button-access';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import AddTweet from '@/components/tweet-add';
import TweetList from '@/components/tweet-list';
import { getInitialTweet, getTweetsByUsername } from '@/service/tweetService';
import Link from 'next/link';

//요구조건 2. 게시한 트위터

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
    <main>
      <header>
        <h1>{user ? user?.username : 'Now Tweet'}</h1>
        <Link href={`/search`}>
          <BtnAccess text='트윗검색' />
        </Link>
        {user && (
          <div className='flex gap-2'>
            <Link href={`/users/${user.username}/edit`}>
              <BtnAccess text='프로필 수정' />
            </Link>
            <form action={logOut}>
              <BtnAccess text='LogOut' />
            </form>
          </div>
        )}
      </header>
      <article>
        <section className='p-5 flex flex-col gap-5'>
          <AddTweet />
          <TweetList initialTweets={user ? userTweets : allTweets} />
        </section>
      </article>
    </main>
  );
}
