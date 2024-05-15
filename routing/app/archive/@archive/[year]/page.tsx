import NewsList from '@/components/news-list';
import { getNewsForYear } from '@/lib/news';

const FilteredNewsPage = ({
  params: { year },
}: {
  params: { year: string };
}) => {
  const newsYear = year;
  const news = getNewsForYear(parseInt(newsYear, 10)) as any;
  return <NewsList news={news} />;
};

export default FilteredNewsPage;
