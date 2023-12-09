import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/performance">Performance</Link>
      <Link href="/reliability">Reliability</Link>
      <Link href="/scale">Scale</Link>
    </header>
  );
}
