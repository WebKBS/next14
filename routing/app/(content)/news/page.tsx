'use client';

import NewsList from '@/components/news-list';
import { useEffect, useState } from 'react';

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/news');
      if (!response.ok) {
        setError('News 데이터를 불러오는데 실패했습니다.');
        setIsLoading(false);
        throw new Error('News 데이터를 불러오는데 실패했습니다.');
      }

      const news = await response.json();
      setNews(news);
      setIsLoading(false);
    }

    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let newsContent;

  if (news) {
    newsContent = <NewsList news={news} />;
  }

  return (
    <>
      <h1>News NewsPage</h1>
      {newsContent}
    </>
  );
};

export default NewsPage;
