export interface Post {
  id: string;
  title: string;
  slug: string;
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
