// components/PostCard.tsx
import Link from 'next/link'

export default function PostCard({ post }) {
  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <Link href={`/${post.slug}`}>Ler mais</Link>
    </div>
  )
}
