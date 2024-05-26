import { getNewsItem } from '@/lib/news';
import Image from 'next/image';
import Link from 'next/link';

const NewsDetailPage = async ({ params }: { params: any }) => {
  const newsSlug = params.slug;
  const newsItem = (await getNewsItem(newsSlug)) as any;

  console.log(newsSlug);

  // console.log(DUMMY_NEWS);

  // if (!newsItem) {
  //   return notFound();
  // }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <Image
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
            width={300}
            height={200}
            className="w-full h-auto"
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
