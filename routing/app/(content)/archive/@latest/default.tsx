import NewsList from '@/components/news-list';
import { getLatestNews } from '@/lib/news';

const LatestNewsPage = async () => {
  const latestNews = (await getLatestNews()) as any;
  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
};

export default LatestNewsPage;
