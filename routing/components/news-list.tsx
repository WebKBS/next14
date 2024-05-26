import Image from 'next/image';
import Link from 'next/link';

const NewsList = ({ news }: { news: any }) => {
  return (
    <ul className="news-list">
      {news.map((newsItem: any) => (
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
  );
};

export default NewsList;
