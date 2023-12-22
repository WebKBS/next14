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

  if (!session) {
    return redirect('/login');
  }

  return (
    <>
      <NavBar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
