import React, { useState } from 'react';

interface NewPost {
  title: string;
  content: string;
  slug: string;
  date: string;
}

export function PostAdminButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
    slug: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Data mínima para o post (pode ajustar conforme necessidade)
    if (!newPost.title || !newPost.content || !newPost.slug) {
      alert('Preencha título, slug e conteúdo.');
      return;
    }

    // Usa a data atual se não fornecida
    const postToCreate = {
      ...newPost,
      date: newPost.date || new Date().toISOString().split('T')[0],
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postToCreate),
    });

    if (res.ok) {
      alert('Post criado com sucesso!');
      setNewPost({ title: '', content: '', slug: '', date: '' });
      setIsOpen(false);
    } else {
      alert('Erro ao criar post.');
    }
  };

  return (
    <>
      {/* Botão fixo */}
      <button
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          zIndex: 1000,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Fechar' : 'Criar Post'}
      </button>

      {/* Formulário que aparece só se isOpen for true */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 60,
            left: 20,
            width: 350,
            padding: 20,
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            borderRadius: 6,
            zIndex: 1000,
          }}
        >
          <h2>Novo Post</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 10 }}
                required
              />
            </label>

            <label>
              Slug:
              <input
                type="text"
                name="slug"
                value={newPost.slug}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: 10 }}
                required
              />
            </label>

            <label>
              Conteúdo:
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleChange}
                style={{ width: '100%', height: 100, marginBottom: 10 }}
                required
              />
            </label>

            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: 4 }}>
              Criar
            </button>
          </form>
        </div>
      )}
    </>
  );
}
