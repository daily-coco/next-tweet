'use server';

import db from '@/lib/db';

export async function searchTweet(keyword: string) {
  const search = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    include: {
      user: true,
    },
  });
  return search;
}
