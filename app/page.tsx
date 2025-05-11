import Link from 'next/link';

export default function AuthMain() {
  return (
    <div className='flex flex-col items-center justify-between min-h-screen p-6'>
      <div className='my-auto flex flex-col items-center gap-2 *:font-medium'>
        <span className='text-9xl'>MyTweet</span>
        <h1 className='text-4xl '>Tweet</h1>
        <h2 className='text-2xl'>
          오늘 하루 일상을 모두와 함께 나눠 보내세요!
        </h2>
      </div>
      <div className='flex flex-col items-center gap-3 w-full'>
        <Link href='/join' className='primary-btn py-2.5 text-lg'>
          시작하기
        </Link>
        <div className='flex gap-2'>
          <span>이미 계정이 있나요?</span>
          <Link href='/login' className='hover:underline'>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
