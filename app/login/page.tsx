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
      <h1>로그인</h1>
      <form action={action} className='flex flex-col gap-3'>
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
          erros={state?.error?.fieldErrors.email}
        />

        <BtnAccess text='로그인하기' />
      </form>
      <div>
        <p>아직 계정이 없으신가요?</p>
        <Button text='지금 바로 Tweet 시작하기' dir='/join' />
      </div>
    </>
  );
}
