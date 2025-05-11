'use client';

import Input from '@/components/input';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import { useFormState } from 'react-dom';
import { loginHandleForm } from './actions';
import BtnAccess from '@/components/button/button-access';
import Button from '@/components/button/button';

export default function Login() {
  const [state, action] = useFormState(loginHandleForm, null);
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen p-6'>
        <h1 className='text-[26px] font-[700]'>로그인</h1>
        <form action={action} className='flex flex-col gap-3 mt-5'>
          <Input
            type='email'
            name='email'
            placeholder='로그인할 이메일을 입력해 주세요'
            required={true}
            erros={state?.error?.fieldErrors.email}
          />

          <Input
            type='password'
            name='password'
            placeholder='비밀번호를 입력해 주세요'
            required={true}
            minLength={PASSWORD_MIN_LENGTH}
            erros={state?.error?.fieldErrors.password}
          />

          <BtnAccess text='로그인하기' />
        </form>
        <div className='mt-20 text-center'>
          <p>아직 계정이 없으신가요?</p>
          <Button
            text='지금 바로 Tweet 시작하기'
            dir='/join'
            style='flex mt-5 px-10 py-3 bg-[#48896e] text-white rounded-full hover:bg-[#2c664f] transition'
          />
        </div>
      </div>
    </>
  );
}
