import NewsList from '@/components/news-list';
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';
import Link from 'next/link';

const FilteredNewsPage = async ({
  params: { filter },
}: {
  params: { filter: string };
}) => {
  // console.log(filter);

  const selectedYear = filter?.[0];

  const selectedMonth = filter?.[1];

  let news: any;
  let links = (await getAvailableNewsYears()) as any;

  if (selectedYear && !selectedMonth) {
    news = (await getNewsForYear(+selectedYear)) as any;
    links = getAvailableNewsMonths(+selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(+selectedYear, +selectedMonth);
    links = [];
  }

  let newsContent = <p>뉴스가 없습니다.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  const availableYears = await getAvailableNewsYears();

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error('Invalid year');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link: any) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
};

export default FilteredNewsPage;
