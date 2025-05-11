import Link from 'next/link';

export default function AuthMain() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6'>
      <div className='flex flex-col items-center gap-2 *:font-medium'>
        <h1 className='text-[52px] font-[700]'>MyTweet</h1>
        <h2 className='text-m text-center'>
          오늘 하루 일상을 MyTweet과 함께 나눠 보세요!
        </h2>
      </div>
      <div className='mt-[20px] flex flex-col items-center gap-3 w-full'>
        <Link
          href='/login'
          className='px-10 py-3 bg-[#48896e] text-white rounded-full hover:bg-[#2c664f] transition'
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
