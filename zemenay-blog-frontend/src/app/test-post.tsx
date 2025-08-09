'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string | null;
  created_at: string;
  updated_at: string;
}

export default function TestPostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('Testing individual post API...');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/posts/4`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched post:', data);
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <div className="p-8">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">No Post Found</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Individual Post</h1>
      <div className="mb-4 p-4 border rounded">
        <h2 className="font-bold text-xl">{post.title}</h2>
        <p className="text-gray-600 mb-2">ID: {post.id}</p>
        <p className="text-gray-600 mb-2">Author: {post.author || 'Unknown'}</p>
        <p className="text-gray-600 mb-4">Created: {new Date(post.created_at).toLocaleDateString()}</p>
        <div className="prose">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
} 