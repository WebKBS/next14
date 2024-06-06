'use server';

import { createAuthSession, destroyAuthSession } from '@/lib/auth';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/user';
import { redirect } from 'next/navigation';

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  let errors = {} as Record<string, string>;

  if (!email.includes('@')) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  if (password.trim().length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = await createUser({ email, password: hashedPassword });
    createAuthSession(id);
    redirect('/training');
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { errors: { email: '이미 사용 중인 이메일입니다.' } };
    }

    throw error;
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { errors: { email: '등록되지 않은 이메일입니다.' } };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return { errors: { password: '비밀번호가 일치하지 않습니다.' } };
  }

  await createAuthSession(existingUser.id);
  redirect('/training');
}

export async function auth(mode: string, prevState: any, formData: FormData) {
  if (mode === 'login') {
    return login(prevState, formData);
  } else {
    return signup(prevState, formData);
  }
}

export async function logout() {
  await destroyAuthSession();

  redirect('/');
}
