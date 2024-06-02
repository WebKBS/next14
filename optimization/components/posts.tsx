'use client';

import { useOptimistic } from 'react';

import { togglePostLikeStatus } from '@/actions/posts';
import logoImage from '@/assets/logo.png';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import LikeButton from './like-icon';

interface PostProps {
  post: {
    id: string;
    image: string;
    title: string;
    userFirstName: string;
    createdAt: string;
    content: string;
    isLiked: boolean;
  };
  action: any;
}

interface ImageProps {
  src: string;
  quality?: number;
  width: number;
}

function imageLoader(config: ImageProps) {
  const urlStart = config.src.split('upload/')[0];
  const urlEnd = config.src.split('upload/')[1];
  const transformations = `w_200,q_${config.quality || 75}`;

  return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post, action }: PostProps) {
  console.log(logoImage);
  return (
    <article className="post">
      <Image src={logoImage} alt={'나의 이미지'} width={100} />

      <div className="post-image">
        <Image
          src={post.image}
          fill
          alt={post.title}
          loader={imageLoader}
          quality={50}
          sizes="10vw"
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }: { posts: any[] }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId: string) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
