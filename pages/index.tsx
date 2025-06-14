import Layout from '../components/Layout';
import styles from '../styles/HomePage.module.css';

export default function Home() {
  const artigoMaisAcessado = {
    title: 'O Poder da Fé',
    excerpt: 'Entenda como a fé transforma vidas e gera esperança...',
    image: '/images/thumbnail/poder-da-fe.jpg',
    slug: 'o-poder-da-fe',
  };

  const videos = [
    {
      title: 'Prossigo para o Alvo | Filipenses 3.12-16 - Thiago Andrade',
      thumb: '/images/thumbnailpost/tg1.png',
      videoUrl: 'https://www.youtube.com/watch?v=AjKXshzoK4A',
    },
    {
      title: 'Oséias o pregador incansável | SÉRIE DE PREGAÇÕES EM OSÉIAS #18- Wesley Rodrigues',
      thumb: '/images/thumbnailpost/wb2.png',
      videoUrl: 'https://www.youtube.com/watch?v=V5Gvpk-0hv4&t=1442s',
    },
    {
      title: 'Quem é o maior? | Marcos 9.33-50 - Pr. Leonardo Cabral',
      thumb: '/images/thumbnailpost/leo1.png',
      videoUrl: 'https://www.youtube.com/watch?v=Br67S4JdfoMv',
    },
  ];

  const curiosidades = [
    {
      question: 'Você sabia que a palavra “Evangelho” significa “Boa Nova”?',
      answeredBy: 'João Silva',
    },
    {
      question: 'O livro mais antigo da Bíblia é o livro de Jó.',
      answeredBy: 'Maria Oliveira',
    },
    {
      question: 'A teologia reformada tem raízes no século XVI, com Lutero e Calvino.',
      answeredBy: 'Pedro Santos',
    },
  ];

  return (
    <Layout>
      {/* Banner */}
    <section className={styles.banner}>
      <img
        src="/images/thumbnailpost/kat-kelley-X9-PQt7IPvs-unsplash.jpg"
        alt="Logo do Blog"
        className={styles.bannerImage}
      />
    </section>


    {/* Artigo em destaque */}
      <section className={styles.artigoDestaque}>
      <h1>Artigos Teologicos</h1>
        <img
          src="/images/thumbnailpost/jonathan-simcoe-pSjwUXBMnlc-unsplash.jpg"
          alt={artigoMaisAcessado.title}
          className={styles.imagemArtigo}
        />
        <h2>{artigoMaisAcessado.title}</h2>
        <p>{artigoMaisAcessado.excerpt}</p>
        <a href={`#`} className={styles.linkLerMais}>
          Ler mais
        </a>
      </section>

      {/* Vídeos */}
      <section className={styles.videos}>
        {videos.map((video, i) => (
          <div key={i} className={styles.videoItem}>
            <div className={styles.videoTitle}>{video.title}</div>
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumb}
                alt={`Thumbnail do vídeo: ${video.title}`}
                className={styles.videoThumb}
              />
            </a>
          </div>
        ))}
      </section>


      {/* Curiosidades */}
      <section className={styles.curiosidades}>
        <h2>Curiosidades</h2>
        <ul>
          {curiosidades.map((item, i) => (
            <li key={i}>
              <strong>Q:</strong> {item.question} <br />
              <small>Respondido por: {item.answeredBy}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
