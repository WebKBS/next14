import { Comment } from '@prisma/client';
import { db } from '..';

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  console.log('코멘트를 불러옵니다.');

  return db.comment.findMany({
    where: { postId },
    include: { user: { select: { name: true, image: true } } },
  });
}
