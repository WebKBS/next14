import { NextResponse } from 'next/server';

export function middleware(request: Request, response: Response) {
  console.log(request);
  // return new Response('Hello, world!');
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
