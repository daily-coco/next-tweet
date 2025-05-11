export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';

import { getTweetDetail } from '@/service/tweetService';
import { getLikeStatus } from '@/service/likeService';
import { getInitialResponse } from '@/service/responseService';

import Responses from '@/components/responses';
import LikeButton from '@/components/like-button';
import getSession from '@/lib/session';

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const cachedLikeStatus = unstable_cache(
    getLikeStatus,
    ['tweet-like-status'],
    {
      tags: [`like-status-${tweetId}`],
    }
  );
  return cachedLikeStatus(tweetId, session.id!);
}
async function getCachedResponses(tweetId: number) {
  const cachedComments = unstable_cache(
    getInitialResponse,
    ['tweet-responses'],
    {
      tags: [`tweet-responses-${tweetId}`],
    }
  );
  return cachedComments(tweetId);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const tweet = await getTweetDetail(id);
  const responses = await getCachedResponses(id);
  if (!tweet) return notFound();
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <div className='flex flex-col p-10 w-full'>
      <div className='relative flex flex-col rounded-md border-2 border-[#a1cab9] bg-white'>
        <h1 className='px-5 py-3 flex items-center text-[16px] font-[700]'>
          {tweet.user.username}
        </h1>
        <div className='px-5 p-2 min-h-56'>{tweet.tweet}</div>

        <div className='absolute top-5 right-5'>
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
        </div>
      </div>
      <div className='mt-10 w-full flex flex-col gap-5'>
        <Responses
          initialResponses={responses}
          tweetId={id}
          username={tweet.user.username}
        />
      </div>
    </div>
  );
}
