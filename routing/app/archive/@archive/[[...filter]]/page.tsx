import { getAvailableNewsYears } from '@/lib/news';
import Link from 'next/link';

const FilteredNewsPage = ({
  params: { filter },
}: {
  params: { filter: string };
}) => {
  console.log(filter);

  const links = getAvailableNewsYears();

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default FilteredNewsPage;
