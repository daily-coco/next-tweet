'use client';
import { useFormStatus } from 'react-dom';

interface IBtnAccessProps {
  text: string;
}

export default function BtnAccess({ text }: IBtnAccessProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='flex justify-center px-5 py-3 bg-[#48896e] text-white rounded-md  hover:bg-[#2c664f] transition disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed'
    >
      {pending ? '잠시만 기다려주세요' : text}
    </button>
  );
}
