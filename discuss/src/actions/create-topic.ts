'use server';
export async function createTopic(formData: FormData) {
  // 재검증 필요

  const name = formData.get('name');
  const description = formData.get('description');

  console.log(name, description);
}
