'use server';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import { isEmailExist, isUsernameExist } from '@/service/authService';
import { typeToFlattenedError, z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const joinFormSchema = z
  .object({
    username: z.preprocess(
      (val) => {
        if (typeof val !== 'string') return val;

        const trimmed = val.trim();

        // 영어만 있는 경우: 소문자로 변환
        const isEnglish = /^[a-zA-Z\s]+$/.test(trimmed);
        return isEnglish ? trimmed.toLowerCase() : trimmed;
      },
      z
        .string({
          invalid_type_error: '정확한 이름을 입력해 주세요.',
          required_error: '이름은 필수 입력입니다.',
        })
        .trim()
        .min(1, '이름은 최소 1자 이상이어야 합니다.')
    ),
    email: z
      .string({
        invalid_type_error: '정확한 이메일 주소를 입력해 주세요.',
        required_error: '이메일은 필수 입력입니다.',
      })
      .email()
      .toLowerCase(),
    password: z
      .string({
        invalid_type_error: '비밀번호를 다시 입력해 주세요.',
        required_error: '비밀번호는 필수 입력입니다.',
      })
      .trim()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호 최소 ${PASSWORD_MIN_LENGTH}자로 입력해야 합니다.`
      ),
    passwordConfirm: z
      .string({
        invalid_type_error: '비밀번호를 다시 입력해 주세요.',
        required_error: '비밀번호는 필수 입력입니다.',
      })
      .trim()
      .min(
        PASSWORD_MIN_LENGTH,
        `비밀번호 최소 ${PASSWORD_MIN_LENGTH}자로 입력해야 합니다.`
      )
      .regex(
        PASSWORD_REGEX,
        `비밀번호는 대소문자와 특수문자를 포함해야 합니다.`
      ),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await isUsernameExist(username);
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '사용자 이름이 존재합니다. 다른 이름으로 입력해 주세요.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const emails = await isEmailExist(email);
    if (emails) {
      ctx.addIssue({
        code: 'custom',
        message:
          '입력한 이메일이 이미지 존재합니다. 다른 이메일을 입력해 주세요.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      });
    }
  });

/*
const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
  
    const domain = email.split('@')[1]?.toLowerCase();
    return EMAIL_ALLOWED_DOMAINS.includes(domain);
 };
*/

interface FormSchema {
  isSuccess: boolean;
  error: typeToFlattenedError<
    {
      username: string;
      email: string;
      password: string;
      passwordConfirm: string;
    },
    string
  > | null;
}

export async function handleForm(
  _: unknown,
  formData: FormData
): Promise<FormSchema> {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
  };
  const result = await joinFormSchema.spa(data);
  if (!result.success) {
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect(`/`);
    // redirect(`/users/${user.username}`);
  }
}
