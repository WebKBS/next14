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

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (e) {
    console.log(e);
  }

  console.log(result);
  return result;
}
