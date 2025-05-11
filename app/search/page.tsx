'use client';

import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { handlerSearch } from './actions';
import Link from 'next/link';
interface ITweetData {
  id: number;
  tweet: string;
  user: {
    username: string;
  };
}
export default function SearchPage() {
  const [results, action] = useFormState(handlerSearch, []);
  return (
    <div className='w-full flex flex-col items-center gap-10 py-8 px-6'>
      <div className='mb-4 inlin-flex  gap-2'>
        <form action={action} className='relative pr-[75px] '>
          <Input
            type='text'
            name='search'
            placeholder='검색할 본문 내용 입력하세요'
            required
            className='w-full'
          />
          <button className='absolute top-0 right-0  text-[14px] w-14 bg-[#807959] text-white rounded-xl p-3 h-[42px]'>
            검색
          </button>
        </form>
      </div>
      <div className='flex flex-col gap-10 border-t border-[#807959] w-full'>
        {results.length > 0 ? (
          results.map((tweet: ITweetData) => (
            <div
              key={tweet.id}
              className='border-b px-3 py-5 hover:bg-[#e3fff3]'
            >
              <Link href={`/tweet/${tweet.id}`}>
                <p>{tweet.tweet}</p>
              </Link>
              <Link href={`/users/${tweet.user.username}`}>
                <small className='text-gray-500'>@{tweet.user.username}</small>
              </Link>
            </div>
          ))
        ) : (
          <p className='p-10 text-center text-gray-400'>
            🫠
            <br />
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
