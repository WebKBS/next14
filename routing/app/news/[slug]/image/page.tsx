import { DUMMY_NEWS } from '@/dummy-news';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ImagePageProps {
  params: {
    slug: string;
  };
}

const ImagePage = ({ params }: ImagePageProps) => {
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find(
    (newsItem) => newsItem.slug === newsItemSlug
  );

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <Image
        src={'/images/news/' + newsItem.image}
        alt={newsItem.title}
        width={1000}
        height={1000}
        className="w-full h-auto"
      />
    </div>
  );
};

export default ImagePage;
