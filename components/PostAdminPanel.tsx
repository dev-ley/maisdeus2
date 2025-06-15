import { useEffect, useState } from 'react';
import styles from '../styles/AdminPanel.module.css';
import { Post } from '../types/post';

export default function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setPosts(prev => prev.filter(p => p.slug !== slug));
    } else {
      alert('Erro ao apagar post');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleSaveEdit = async (updatedPost: Post) => {
    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      const updated = await res.json();
      setPosts(prev => prev.map(p => (p.slug === updated.slug ? updated : p)));
      setEditingPost(null);
    } else {
      alert('Erro ao salvar post');
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.panel}>
      <h2>Painel Administrativo</h2>
      {posts.map(post => (
        <div key={post.slug} className={styles.card}>
          <h3>{post.title}</h3>
          <p><strong>Data:</strong> {post.date}</p>
          <div className={styles.actions}>
            <button onClick={() => handleEdit(post)}>Editar</button>
            <button onClick={() => handleDelete(post.slug)} className={styles.delete}>Apagar</button>
          </div>
        </div>
      ))}

      {editingPost && (
        <div className={styles.editModal}>
          <h3>Editando: {editingPost.title}</h3>
          <textarea
            value={editingPost.content}
            onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
          />
          <div className={styles.modalButtons}>
            <button onClick={() => editingPost && handleSaveEdit(editingPost)}>Salvar</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
