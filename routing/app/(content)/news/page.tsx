import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

const NewsPage = async () => {
  const news = (await getAllNews()) as any;

  console.log(news);

  return (
    <>
      <h1>News NewsPage</h1>
      <NewsList news={news} />
    </>
  );
};

export default NewsPage;
