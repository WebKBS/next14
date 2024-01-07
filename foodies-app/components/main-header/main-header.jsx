import LogoImage from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image
            src={LogoImage}
            alt="food on it"
            width={50}
            height={50}
            priority
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={'/meals'} classes>
                Browser Meals
              </NavLink>
            </li>
            <li>
              <NavLink href={'/community'} classes>
                Foodies Community
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
