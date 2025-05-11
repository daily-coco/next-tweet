import { z } from 'zod';

export const responseSchema = z
  .string({
    required_error: '답글 내용은 필수 입니다.',
  })
  .trim();
//   .max(200, '200자 내외로 입력해 주세요.');
