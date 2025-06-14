export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // usar string ISO (ex: '2025-06-14')
  image: string;
}

export const posts: Post[] = [
  {
    slug: 'post1',
    title: 'Post 1 (mais novo)',
    excerpt: 'Resumo do post 1...',
    date: '2025-06-14',
    image: '/images/thumbnailpost/hasan-almasi-dSsDSLB-YYw-unsplash.jpg',
  },
  {
    slug: 'post2',
    title: 'Post 2',
    excerpt: 'Resumo do post 2...',
    date: '2025-06-10',
    image: '/images/thumbnailpost/jonathan-simcoe-pSjwUXBMnlc-unsplash.jpg',
  },
  {
    slug: 'post3',
    title: 'Post 3',
    excerpt: 'Resumo do post 3...',
    date: '2025-06-05',
    image: '/images/thumbnailpost/kat-kelley-X9-PQt7IPvs-unsplash.jpg',
  },
  {
    slug: 'post4',
    title: 'Post 4 (mais antigo)',
    excerpt: 'Resumo do post 4...',
    date: '2025-06-01',
    image: '/images/thumbnailpost/rod-long-VHS_CmxFBGI-unsplash.jpg',
  },
  {
    slug: 'post5',
    title: 'Post 5 (mais antigo)',
    excerpt: 'Resumo do post 4...',
    date: '2025-06-01',
    image: '/images/thumbnailpost/yash-bhardwaj-KK41OcTfllc-unsplash.jpg',
  }
  // mais posts aqui...
];
