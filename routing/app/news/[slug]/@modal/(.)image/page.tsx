import { DUMMY_NEWS } from '@/dummy-news';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface InterceptedImagePageProps {
  params: {
    slug: string;
  };
}

const InterceptedImagePage = ({ params }: InterceptedImagePageProps) => {
  const newsItemSlug = params.slug;

  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.id === newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image
            src={'/images/news/' + newsItem.image}
            alt={newsItem.title}
            width={100}
            height={100}
            className="w-[100px] h-auto"
          />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;
