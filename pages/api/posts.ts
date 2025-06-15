import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../types/post';

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');

function readPosts(): Post[] {
  try {
    const fileData = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Erro ao ler os posts:', error);
    return [];
  }
}

function writePosts(posts: Post[]) {
  try {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
  } catch (error) {
    console.error('Erro ao salvar os posts:', error);
    throw error;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const posts = readPosts();
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      const newPost: Post = req.body;

      // Validação mínima
      if (!newPost.title || !newPost.slug || !newPost.content) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
      }

      const posts = readPosts();

      // Verifica se já existe um post com o mesmo slug
      const slugExists = posts.some(post => post.slug === newPost.slug);
      if (slugExists) {
        return res.status(409).json({ message: 'Slug já existe.' });
      }

      posts.push(newPost);
      writePosts(posts);

      return res.status(201).json(newPost);
    }

    if (req.method === 'DELETE') {
      const { slug } = req.query;

      if (!slug) {
        return res.status(400).json({ message: 'Slug inválido' });
      }

      const slugStr = Array.isArray(slug) ? slug[0] : slug;

      const posts = readPosts();
      const updatedPosts = posts.filter(post => post.slug !== slugStr);

      if (posts.length === updatedPosts.length) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }

      writePosts(updatedPosts);
      return res.status(200).json({ message: 'Post deletado com sucesso' });
    }

    if (req.method === 'PUT') {
      const updatedPost: Post = req.body;

      if (!updatedPost || !updatedPost.slug) {
        return res.status(400).json({ message: 'Dados do post inválidos' });
      }

      const posts = readPosts();
      const index = posts.findIndex(post => post.slug === updatedPost.slug);

      if (index === -1) {
        return res.status(404).json({ message: 'Post não encontrado' });
      }

      posts[index] = updatedPost;
      writePosts(posts);

      return res.status(200).json(updatedPost);
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    return res.status(405).end(`Método ${req.method} não permitido.`);
  } catch (error) {
    console.error('Erro interno na API:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
