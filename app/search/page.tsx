'use client';

import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { handlerSearch } from './actions';

export default function SearchPage() {
  const [results, action] = useFormState(handlerSearch, []);
  return (
    <div className='p-4'>
      <div className='mb-4 flex gap-2'>
        <form action={action}>
          <Input
            type='text'
            name='search'
            placeholder='검색할 키워드를 입력하세요'
            required
          />
          <button className='bg-blue-500 text-white px-3 py-1 rounded'>
            검색
          </button>
        </form>
      </div>
      <div>
        {results.length > 0 ? (
          results.map((tweet: any) => (
            <div key={tweet.id} className='border-b py-2'>
              <p>{tweet.tweet}</p>
              <small className='text-gray-500'>@{tweet.user.username}</small>
            </div>
          ))
        ) : (
          <p className='text-gray-400'>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
