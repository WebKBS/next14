import { DUMMY_NEWS } from '@/dummy-news';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const NewsDetailPage = ({ params }: { params: { slug: string } }) => {
  const newsSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((news) => news.slug === newsSlug)!;

  if (!newsItem) {
    return notFound();
  }

  return (
    <article>
      <header>
        <Image
          src={`/images/news/${newsItem.image}`}
          alt={newsItem.title}
          width={300}
          height={200}
        />
        <h1>{newsItem.title}</h1>
        <time>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailPage;
