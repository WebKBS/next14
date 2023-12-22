import GithubSignInButton from '@/app/components/GithubSignInButton';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';
import { authOptions } from '@/app/utils/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/home');
  }

  return (
    <div className="px-6 py-10 mt-24 rounded bg-black/60 md:mt-0 md:max-w-sm md:px-14">
      <form action="">
        <h1 className="text-3xl font-semibold text-white">Login</h1>
        <div className="mt-5 space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Button variant="destructive" className="w-full bg-[#e50914]">
            Login
          </Button>
        </div>
      </form>
      <div className="mt-2 text-sm text-gray-500">
        New to Netflix?{' '}
        <Link href="/sign-up" className="text-white hover:underline">
          Sign up now!
        </Link>
      </div>
      <div className="flex items-center justify-center w-full mt-6 gap-x-3">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
}
