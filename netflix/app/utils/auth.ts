// prisma 사용시 next auth apdapter 사용
// https://authjs.dev/reference/adapter/prisma?_gl=1*d7l892*_gcl_au*MjA3NTA4NjM4OS4xNzAzMjI2NTkw
//npm install @prisma/client @auth/prisma-adapter
//npm install prisma --save-dev
// supabase 셋팅후 env 파일에 supabase url 추가

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
// prisma model 설정 후 npx prisma db push

import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GitHubPRovider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './db';

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHubPRovider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    maxAge: 60 * 60,
  },
} satisfies NextAuthOptions;
