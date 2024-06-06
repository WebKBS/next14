import AuthForm from '@/components/auth-form';

export default async function Home({
  searchParams,
}: {
  searchParams: { mode: string };
}) {
  const formMode = searchParams.mode || 'login';
  console.log(searchParams);
  return <AuthForm mode={formMode} />;
}
