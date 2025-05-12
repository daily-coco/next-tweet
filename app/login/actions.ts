'use server';

import { typeToFlattenedError, z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import { isEmailExist } from '@/service/authService';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const loginFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: '정확한 이메일 주소를 입력해 주세요.',
      required_error: '이메일은 필수 입력입니다.',
    })
    .email()
    .toLowerCase()
    .refine(isEmailExist, '해당 계정이 존재하지 않습니다.'),
  password: z
    .string({
      required_error: '비밀번호 입력은 필수 입니다.',
    })
    .trim()
    .min(
      PASSWORD_MIN_LENGTH,
      `비밀번호 최소 ${PASSWORD_MIN_LENGTH}자로 입력해야 합니다.`
    ),
});

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    { email: string; username: string; password: string },
    string
  > | null;
}

export async function loginHandleForm(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await loginFormSchema.spa(data);

  if (!result.success) {
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  }

  // DB - user data 조회
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });

  if (!user || !(await bcrypt.compare(result.data.password, user.password!))) {
    return {
      error: {
        formErrors: [],
        fieldErrors: {
          password: [
            '비밀번호가 틀렸습니다. 다시 한 번 확인 후 입력해 주세요.',
          ],
          email: [],
        },
      },
      isSuccess: false,
    };
  }
  const session = await getSession();
  session.id = user.id;
  await session.save();
  redirect(`/users/${encodeURIComponent(user.username)}`);
}
