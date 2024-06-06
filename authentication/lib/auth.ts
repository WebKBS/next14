import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import db from './db';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false, // 세션 쿠키 만료 시간
    attributes: {
      secure: process.env.NODE_ENV === 'production', // https에서만 쿠키 전송
    },
  },
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sesstionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sesstionCookie.name,
    sesstionCookie.value,
    sesstionCookie.attributes
  );
}
