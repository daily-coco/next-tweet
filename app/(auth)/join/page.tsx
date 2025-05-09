'use client';

import { useFormState } from 'react-dom';
import { handleForm } from './actions';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPECIAL_CHARACTER,
} from '@/lib/constants';
import BtnAccess from '@/components/button/button-access';
import Input from '@/components/input';

export default function JoinForm() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div>
      <div className='flex flex-col gap-10 py-8 px-6'>
        <div className='flex flex-col gap-2 *:font-medium'>
          <h1 className='text-2xl'>안녕하세요!</h1>
          <h2 className='text-xl'>Fill in the form below to join!</h2>
        </div>
        <form action={action} className='flex flex-col gap-3'>
          <Input
            type='text'
            name='username'
            placeholder='이름을 입력해 주세요.'
            required={true}
            minLength={2}
            maxLength={20}
            erros={state?.error?.fieldErrors.username}
          />
          <Input
            type='email'
            name='email'
            placeholder='로그인 시 사용할 이메일 입력 ex) tweet@tweet.com'
            required={true}
            erros={state?.error?.fieldErrors.email}
          />
          <Input
            type='password'
            name='password'
            placeholder={`비밀번호는 대/소문자와 특수문자 ${PASSWORD_SPECIAL_CHARACTER}를 포함 최소 ${PASSWORD_MIN_LENGTH}로 작성`}
            title={`비밀번호는 대/소문자와 특수문자 ${PASSWORD_SPECIAL_CHARACTER}를 포함 최소 ${PASSWORD_MIN_LENGTH}로 작성`}
            required={true}
            minLength={PASSWORD_MIN_LENGTH}
            erros={state?.error?.fieldErrors.password}
          />
          <Input
            type='password'
            name='passwordConfirm'
            placeholder='비밀번호 확인'
            required={true}
            minLength={PASSWORD_MIN_LENGTH}
            erros={state?.error?.fieldErrors.passwordConfirm}
          />
          <BtnAccess text='가입하기' />
        </form>
      </div>
    </div>
  );
}
