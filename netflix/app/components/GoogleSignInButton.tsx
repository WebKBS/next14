'use client';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoggleIcon from '../../public/google.svg';

export default function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn('google')} variant="outline" size="icon">
      <Image src={GoggleIcon} alt="google icon" width={24} height={24} />
    </Button>
  );
}
