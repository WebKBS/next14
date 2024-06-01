import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logo}
          // width={100} // width를 설정하는것보다 sizes를 사용하는 것이 더 좋다.
          // 하지만 고정된 width를 사용해야 하는 경우에는 width를 사용해도 된다.
          sizes="10vw"
          alt="Mobile phone with posts feed on it"
          priority
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
