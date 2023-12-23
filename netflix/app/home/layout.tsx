// logout을 구현 하려면 layout 을 사용해야 한다.

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NavBar from '../components/NavBar';
import { authOptions } from '../utils/auth';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  const username = session?.user?.name as string;
  const useremail = session?.user?.email as string;
  const userimage = session?.user?.image as string;

  if (!session) {
    return redirect('/login');
  }

  return (
    <>
      <NavBar name={username} email={useremail} image={userimage} />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
