import { Button } from '@/components/ui/button';
import { Heart, PlayCircle } from 'lucide-react';

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
}

export default function MovieCard({
  movieId,
  title,
  overview,
  watchList,
  watchListId,
  youtubeUrl,
}: iAppProps) {
  return (
    <>
      <button className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
