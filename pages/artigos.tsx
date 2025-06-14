import { useState } from 'react';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { posts, Post } from '../data/posts';

const POSTS_PER_PAGE = 3;

export default function Home() {
  // Ordenar os posts por data (garantia)
  const sortedPosts = [...posts].sort(
	(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  // Calcula os índices do slice para pegar os posts da página atual
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  const goToNextPage = () => {
	setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
	setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
	<Layout>
	  <h1>Últimos Artigos</h1>

	  {currentPosts.map((post: Post) => (
		<PostCard key={post.slug} {...post} />
	  ))}

	  <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
		<button onClick={goToPreviousPage} disabled={currentPage === 1}>
		  Anterior
		</button>

		<span>
		  Página {currentPage} de {totalPages}
		</span>

		<button onClick={goToNextPage} disabled={currentPage === totalPages}>
		  Próximo
		</button>
	  </div>
	</Layout>
  );
}
