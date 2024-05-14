import { DUMMY_NEWS } from '@/dummy-news';
import Image from 'next/image';
import Link from 'next/link';

const NewsPage = () => {
  return (
    <>
      <h1>News NewsPage</h1>
      <ul className="news-list">
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <Image
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
                width={300}
                height={200}
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsPage;
