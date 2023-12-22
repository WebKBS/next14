'use client';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import Logo from '../../public/netflix_logo.svg';
import UserNav from './UserNav';

interface linkProps {
  name: string;
  href: string;
}
const links: linkProps[] = [
  {
    name: 'Home',
    href: '/home',
  },
  {
    name: 'TV Shows',
    href: '/home/shows',
  },
  {
    name: 'Movies',
    href: '/home/movies',
  },
  {
    name: 'Recently Added',
    href: '/home/recently',
  },
  {
    name: 'My List',
    href: '/home/user/list',
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full px-5 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Netflex logo" priority />
        </Link>
        <ul className="hidden lg:flex gap-x-4 ml-14">
          {links.map((link, idx) => (
            <Fragment key={idx}>
              {pathname === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-white underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm font-normal text-gray-300"
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-300 cursor-pointer" />
        <UserNav />
      </div>
    </div>
  );
}
