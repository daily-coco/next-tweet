'use client';

import BtnAccess from '@/components/button/button-access';
import Input from '@/components/input';
import { useParams, useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { handleEditForm } from './actions';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPECIAL_CHARACTER,
} from '@/lib/constants';

export default function EditPage() {
  const { username } = useParams();
  const [state, action] = useFormState(handleEditForm, null);
  const router = useRouter();

  // ✅ 수정 성공 시 1.5초 뒤 이동
  if (state?.isSuccess) {
    setTimeout(() => {
      router.push(`/users/${username}`);
    }, 1500);
  }

  const updated = state?.updatedFields || [];
  const successMessage = state?.isSuccess
    ? updated.length
      ? `✅ [${updated.join(', ')}] 항목이 수정되었습니다.`
      : ''
    : '';
  const formError = state?.error?.formErrors?.[0];
  return (
    <div>
      <h1>{username}님의 프로필 수정</h1>
      <div>
        {/* 사용자 이름  이메일, 바이오 비밀번호 변경 */}
        <form action={action} className='flex flex-col gap-3'>
          <Input
            type='text'
            name='username'
            placeholder='이름'
            updatedFields={updated}
            minLength={1}
            maxLength={20}
            erros={state?.error?.fieldErrors.username}
          />
          <Input
            type='text'
            name='bio'
            updatedFields={updated}
            placeholder='나를 소개글을 작성해 보세요'
            minLength={1}
            maxLength={100}
            erros={state?.error?.fieldErrors.bio}
          />
          <Input
            type='email'
            name='email'
            updatedFields={updated}
            placeholder='로그인 시 사용할 이메일 입력 ex) tweet@tweet.com'
            erros={state?.error?.fieldErrors.email}
          />
          <Input
            type='password'
            name='password'
            updatedFields={updated}
            placeholder={`비밀번호는 대/소문자와 특수문자 ${PASSWORD_SPECIAL_CHARACTER}를 포함 최소 ${PASSWORD_MIN_LENGTH}로 작성`}
            title={`비밀번호는 대/소문자와 특수문자 ${PASSWORD_SPECIAL_CHARACTER}를 포함 최소 ${PASSWORD_MIN_LENGTH}로 작성`}
            minLength={PASSWORD_MIN_LENGTH}
            erros={state?.error?.fieldErrors.password}
          />
          <Input
            type='password'
            name='passwordConfirm'
            placeholder='비밀번호 확인'
            minLength={PASSWORD_MIN_LENGTH}
            erros={state?.error?.fieldErrors.passwordConfirm}
          />
          <BtnAccess text='수정완료하기' />
          {formError && (
            <p className='text-red-500 text-sm mt-2'>{formError}</p>
          )}
          {successMessage && (
            <p className='text-green-600 font-medium mt-2'>{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
