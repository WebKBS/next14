import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface InterceptedImagePageProps {
  params: {
    slug: string;
  };
}

const InterceptedImagePage = async ({ params }: InterceptedImagePageProps) => {
  const newsItemSlug = params.slug;

  const newsItem = (await getNewsItem(newsItemSlug)) as any;

  console.log(newsItem);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
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
