import { useRouter } from 'next/router';
import posts from '../../data/posts.json';  // import JSON direto
import Layout from '../../components/Layout';
import { Post } from '../../types/post';

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Garantir que posts estejam tipados
  const typedPosts: Post[] = posts as Post[];

  // Enquanto slug não estiver disponível, mostrar carregando
  if (!slug) {
    return <Layout><p>Carregando...</p></Layout>;
  }

  // slug pode ser string ou array de strings (se rota for catch-all)
  if (Array.isArray(slug)) {
    return <Layout><p>Slug inválido.</p></Layout>;
  }

  const post = typedPosts.find(p => p.slug === slug);

  if (!post) return <Layout><p>Post não encontrado.</p></Layout>;

  return (
    <Layout>
      <article style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <h1>{post.title}</h1>
        <img 
          src={post.image} 
          alt={post.title} 
          style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, marginBottom: '1rem' }} 
        />
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          {new Date(post.date).toLocaleDateString()}
          {' '}| Categoria: <strong>{post.category}</strong>
        </p>

        <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>{post.excerpt}</p>

        <section style={{ marginTop: '2rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
          <p>{post.content}</p>
        </section>

        <section style={{ marginTop: '3rem', borderTop: '1px solid #ddd', paddingTop: '2rem', display: 'flex', alignItems: 'center' }}>
          <img 
            src={post.author.avatarUrl} 
            alt={post.author.name} 
            style={{ width: 80, height: 80, borderRadius: '50%', marginRight: '1.5rem', objectFit: 'cover' }} 
          />
          <div>
            <h3 style={{ margin: 0 }}>{post.author.name}</h3>
            <p style={{ margin: 0, color: '#555' }}>{post.author.bio}</p>
          </div>
        </section>
      </article>
    </Layout>
  );
}
