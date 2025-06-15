import { useState } from 'react';
import styles from '../styles/PostForm.module.css';

export interface Post {
  id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    name: string;
    bio: string;
    avatarUrl: string;
  };
  category: string;
}

const PostForm = () => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Post>({
    id: '',
    title: '',
    slug: '',
    image: '',
    excerpt: '',
    content: '',
    date: '',
    author: {
      name: '',
      bio: '',
      avatarUrl: '',
    },
    category: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Se for campo do author (ex: author.name)
    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples (pode melhorar com libs tipo Yup ou Zod depois)
    if (
      !formData.id ||
      !formData.title ||
      !formData.slug ||
      !formData.excerpt ||
      !formData.content ||
      !formData.date ||
      !formData.author.name ||
      !formData.category
    ) {
      setMessage('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    // Salvar ou enviar os dados
    console.log('Post criado:', formData);
    setMessage('Post criado com sucesso!');
    setShowForm(false);

    // Resetar formulário
    setFormData({
      id: '',
      title: '',
      slug: '',
      image: '',
      excerpt: '',
      content: '',
      date: '',
      author: {
        name: '',
        bio: '',
        avatarUrl: '',
      },
      category: '',
    });
  };

  return (
    <>
      <button
        className={styles.floatingButton}
        onClick={() => {
          setShowForm((prev) => !prev);
          setMessage('');
        }}
        aria-label={showForm ? 'Fechar formulário' : 'Abrir formulário'}
      >
        {showForm ? '✖' : '+'}
      </button>

      {showForm && (
        <div className={styles.modalOverlay}>
          <form className={styles.postForm} onSubmit={handleSubmit} noValidate>
            <h2>Novo Post Completo</h2>

            <input
              name="id"
              placeholder="ID único do post"
              value={formData.id}
              onChange={handleChange}
              required
            />

            <input
              name="slug"
              placeholder="Slug (ex: o-poder-da-fe)"
              value={formData.slug}
              onChange={handleChange}
              required
            />

            <input
              name="title"
              placeholder="Título do artigo"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              name="excerpt"
              placeholder="Resumo breve"
              value={formData.excerpt}
              onChange={handleChange}
              required
            />

            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              name="image"
              type="url"
              placeholder="URL da imagem (opcional)"
              value={formData.image}
              onChange={handleChange}
            />

            <textarea
              name="content"
              placeholder="Conteúdo completo do artigo"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
            />

            <hr />

            <h3>Informações do Autor</h3>

            <input
              name="author.name"
              placeholder="Nome do autor"
              value={formData.author.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="author.bio"
              placeholder="Biografia do autor"
              value={formData.author.bio}
              onChange={handleChange}
              rows={3}
            />

            <input
              name="author.avatarUrl"
              type="url"
              placeholder="URL do avatar do autor"
              value={formData.author.avatarUrl}
              onChange={handleChange}
            />

            <hr />

            <input
              name="category"
              placeholder="Categoria do post"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <button type="submit">Salvar</button>

            {message && <p className={styles.message}>{message}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default PostForm;
