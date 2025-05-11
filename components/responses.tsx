'use client';

import { useOptimistic } from 'react';
import { useFormState } from 'react-dom';
// import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

import { addTweetResponse, InitialResponses } from '@/service/responseService';
import Input from './input';
import { responseSchema } from '@/lib/schema';

export default function Responses({
  initialResponses,
  tweetId,
  username,
}: {
  initialResponses: InitialResponses;
  tweetId: number;
  username: string;
}) {
  const [responses, optimisticResponse] = useOptimistic(
    initialResponses,
    (previousResponses, responseOptimisticValue: string) => {
      return [
        ...previousResponses,
        {
          id: new Date().getDate(),
          reply: responseOptimisticValue,
          created_at: new Date(),
          tweetId,
          user: { username, id: Infinity },
        },
      ];
    }
  );

  const handleUploadResponse = (_: unknown, formData: FormData) => {
    const result = responseSchema.safeParse(formData.get('text'));
    if (result.success) {
      optimisticResponse(result.data);
      addTweetResponse(formData);
    } else {
      return result.error.flatten();
    }
  };
  const [state, action] = useFormState(handleUploadResponse, null);
  return (
    <div className='w-full gap-3'>
      <form action={action} className='relative pr-[75px] '>
        <Input
          name='text'
          type='text'
          required
          placeholder='이 Tweet에 답변 남기기'
          erros={state?.fieldErrors[0]}
          className='w-full'
        />
        <input
          className='hidden'
          type='hidden'
          name='tweetId'
          value={tweetId}
        />
        <button className='absolute top-0 right-0  text-[14px] w-14 bg-[#807959] text-white rounded-xl p-3 h-[42px]'>
          추가
        </button>
      </form>
      {responses.map((response) => (
        <div key={response.id} className='*:text-md flex items-center my-3'>
          <span className='font-semibold w-3/12'>{response.user.username}</span>
          <span> {response.reply}</span>
        </div>
      ))}
    </div>
  );
}
