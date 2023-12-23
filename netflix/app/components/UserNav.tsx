'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

export default function UserNav({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-sm">
          <Avatar className="w-10 h-10 rounded-sm">
            <AvatarImage src="https://elbbpziesbduzmpkjggk.supabase.co/storage/v1/object/public/user%20image/avatar.png" />
            <AvatarFallback className="rounded-sm"></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <Avatar className="w-10 h-10 rounded-sm mx-auto">
              <AvatarImage src={image} />
            </Avatar>
            <p className="text-sm font-medium leading-none mb-2 line-clamp-1">
              {name}
            </p>
            <p className="text-xs leading-none text-muted-foreground line-clamp-1">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
