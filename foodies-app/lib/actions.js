'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  'use server';
  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.image ||
    !meal.creator_email.includes('@') ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input, please try again!',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals'); // 두번째 파라미터로 layout이나 page를 넘겨줄 수 있다.
  redirect('/meals');
}
