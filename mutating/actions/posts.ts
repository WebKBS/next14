'use server';

import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export async function createPost(prevState: any, formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  const image = formData.get('image') as File;
  const content = formData.get('content') as string;

  let errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push('제목이 필요합니다.');
  }

  if (!content || content.trim().length === 0) {
    errors.push('내용이 필요합니다.');
  }

  if (!image) {
    errors.push('이미지가 필요합니다.');
  } else if (image.size === 0) {
    errors.push('이미지는 비어 있을 수 없습니다.');
  } else if (image.type.indexOf('image/') !== 0) {
    errors.push('파일은 이미지여야 합니다.');
  }

  if (errors.length > 0) {
    // 에러 처리
    console.log('잘못된 폼 데이터:', errors);
    // 필요한 경우 여기에서 반환하거나 에러를 던질 수 있습니다.
  }

  if (errors.length > 0) {
    return { errors };
  }

  await storePost({
    imageUrl: '', // Assuming you will handle the image upload and get the URL separately
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
}
