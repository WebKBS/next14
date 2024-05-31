'use server';

import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(prevState: any, formData: FormData) {
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

  let imageUrl: string;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    // 필요한 경우 여기에서 반환하거나 에러를 던질 수 있습니다.
    throw new Error('이미지 업로드 실패');
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
}

export async function togglePostLikeStatus(postId: number) {
  updatePostLikeStatus(postId, 2);
  revalidatePath('/feed');
}
