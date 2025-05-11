'use client';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import { dislikeTweet, likeTweet } from '@/app/tweet/[id]/actions';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (previousState, _payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
          ? previousState.likeCount - 1
          : previousState.likeCount + 1,
      };
    }
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400  hover:text-white  text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
        state.isLiked ? 'bg-[#41725b] text-white' : 'hover:bg-[#41725b]'
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className='size-5' />
      ) : (
        <OutlineHandThumbUpIcon className='size-5' />
      )}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>공감해요 ({state.likeCount})</span>
      )}
    </button>
  );
}
