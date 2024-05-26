import { DUMMY_NEWS } from '@/dummy-news';
import Image from 'next/image';
import Link from 'next/link';

const NewsDetailPage = ({ params }: { params: { slug: string } }) => {
  const newsSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((news) => news.id === newsSlug)!;

  // console.log(DUMMY_NEWS);

  // if (!newsItem) {
  //   return notFound();
  // }

  return (
    <article>
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <Image
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
            width={300}
            height={200}
          />
        </Link>
        <h1>{newsItem.title}</h1>
        <time>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
};

export default NewsDetailPage;
