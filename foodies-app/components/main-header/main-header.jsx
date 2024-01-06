import LogoImage from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';

export default function MainHeader() {
  console.log(Image);
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
              <Link href="/meals">Browser Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
