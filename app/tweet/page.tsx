import BtnAccess from '@/components/button/button-access';
import TweetList from '@/components/tweet-list';
import { getInitialTweet } from '@/service/tweetService';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
export default async function AllTweet() {
  const allTweets = await getInitialTweet();
  return (
    <main>
      <header>
        <h1>Now Tweet</h1>
        <Link href={`/search`}>
          <BtnAccess text='트윗검색' />
        </Link>
      </header>
      <article>
        <section className='p-5 flex flex-col gap-5'>
          <TweetList initialTweets={allTweets} />
        </section>
      </article>
    </main>
  );
}
