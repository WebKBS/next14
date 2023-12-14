'use server';

import { z } from 'zod';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: '영어 소문자와 하이픈(-)만 사용할 수 있습니다.',
    }),
  description: z.string().min(10),
});

export async function createTopic(formData: FormData) {
  // 재검증 필요

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
  }
}
