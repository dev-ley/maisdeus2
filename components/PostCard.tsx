// components/PostCard.tsx
import styles from '../styles/PostCard.module.css';
import Link from 'next/link';

type PostCardProps = {
  title: string;
  excerpt: string;
  slug: string;
  image?: string;
};

const PostCard = ({ title, excerpt, slug, image }: PostCardProps) => {
  return (
    <div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <Link href={`/posts/${slug}`} className={styles.readMore}>
          Ler mais →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
