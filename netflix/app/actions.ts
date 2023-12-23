'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from './utils/auth';
import prisma from './utils/db';

export async function addToWatchList(formData: FormData) {
  'use server';

  const moviewId = formData.get('movieId');
  const pathname = formData.get('pathname') as string;

  const session = await getServerSession(authOptions);

  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(moviewId),
    },
  });

  revalidatePath(pathname);
}

export async function deleteFormWatchList(formData: FormData) {
  'use server';

  const watchListId = formData.get('watchListId') as string;
  const pathname = formData.get('pathname') as string;

  const data = await prisma.watchList.deleteMany({
    where: {
      id: watchListId,
    },
  });

  revalidatePath(pathname);
}
