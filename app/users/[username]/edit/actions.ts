'use server';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/lib/constants';
import { isEmailExist, isUsernameExist } from '@/service/authService';
import { typeToFlattenedError, z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import getSession from '@/lib/session';

const profileEditSchema = z
  .object({
    username: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string({
          invalid_type_error: '정확한 이름을 입력해 주세요.',
          required_error: '이름은 필수 입력입니다.',
        })
        .toLowerCase()
        .trim()
        .min(1)
        .optional()
    ),
    bio: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string({
          invalid_type_error: '소개글을 입력해 주세요.',
        })
        .trim()
        .optional()
    ),
    email: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string({
          invalid_type_error: '정확한 이메일 주소를 입력해 주세요.',
          required_error: '이메일은 필수 입력입니다.',
        })
        .email()
        .toLowerCase()
        .optional()
    ),
    password: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string({
          invalid_type_error: '비밀번호를 다시 입력해 주세요.',
          required_error: '비밀번호는 필수 입력입니다.',
        })
        .trim()
        .min(
          PASSWORD_MIN_LENGTH,
          `비밀번호 최소 ${PASSWORD_MIN_LENGTH}자로 입력해야 합니다.`
        )
        .optional()
    ),
    passwordConfirm: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
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
        )
        .optional()
    ),
  })
  .superRefine(async ({ username }, ctx) => {
    if (username) {
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
    }
  })
  .superRefine(async ({ email }, ctx) => {
    if (email) {
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
type FormErrorType = typeToFlattenedError<
  {
    username: string;
    email: string;
    bio: string;
    password: string;
    passwordConfirm: string;
  },
  string
> & { formErrors: string[] };

interface FormEditSchema {
  isSuccess: boolean;
  error: FormErrorType | null;
  updatedFields?: string[];
}

export async function handleEditForm(
  _: unknown,
  formData: FormData
): Promise<FormEditSchema & { updatedFields?: string[] }> {
  const data = {
    username: formData.get('username')?.toString(),
    email: formData.get('email')?.toString(),
    bio: formData.get('bio')?.toString(),
    password: formData.get('password')?.toString(),
    passwordConfirm: formData.get('passwordConfirm')?.toString(),
  };
  const result = await profileEditSchema.spa(data);
  //사용자가 선택적인 필드에 대해서만 데이터 업데이트

  if (!result.success) {
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  }

  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      username: true,
      email: true,
      bio: true,
      password: true,
    },
  });
  if (!user) {
    return {
      isSuccess: false,
      error: null,
    };
  }

  const updatedFields: string[] = [];
  const updateData: Record<string, unknown> = {};

  const { username, email, bio, password } = result.data;
  if (username && username !== user.username) {
    updateData.username = username;
    updatedFields.push('username');
  }
  if (email && email !== user.email) {
    updateData.email = email;
    updatedFields.push('email');
  }
  if (bio && bio !== user.bio) {
    updateData.bio = bio;
    updatedFields.push('bio');
  }
  if (password) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      updateData.password = await bcrypt.hash(password, 12);
      updatedFields.push('password');
    }
  }
  console.log(updatedFields.length);

  if (updatedFields.length === 0) {
    return {
      isSuccess: false,
      error: {
        fieldErrors: {},
        formErrors: ['변경된 정보가 없습니다.'],
      },
    };
  }
  await db.user.update({
    where: { id: session.id },
    data: updateData,
  });

  return {
    isSuccess: true,
    error: null,
    updatedFields,
  };
}
