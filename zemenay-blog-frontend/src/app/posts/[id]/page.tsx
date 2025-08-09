'use client';

import { Header } from "../../components/header";
import { Post } from "../../lib/definitions";
import { useState, useEffect } from "react";
import { format } from 'date-fns'; // We'll use this for nice date formatting
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const id = params.id as string;
        console.log(`Fetching post with ID: ${id}`);
        
        // For client-side requests, use the environment variable or fallback to localhost
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const url = `${apiUrl}/posts/${id}`;
        
        console.log(`Fetching from: ${url}`);
        
        const res = await fetch(url, { 
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        console.log(`Response status: ${res.status}`);

        // The API will return a 404 if not found, so we check for that
        if (!res.ok) {
          console.log(`Post not found: ${res.status}`);
          setError('Post not found');
          return;
        }

        const data = await res.json();
        console.log('Post data:', data);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    if (params.id && mounted) {
      fetchPost();
    }
  }, [params.id, mounted]);

  // Helper function to format date consistently
  const formatDate = (dateString: string) => {
    if (!mounted) return ''; // Return empty string during SSR to prevent hydration mismatch
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center text-muted-foreground mt-20">
              <p>Loading post...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                ← Back to Posts
              </Link>
            </div>
            <div className="text-center text-red-500 mt-20">
              <p>Error: {error}</p>
              <p className="mt-4">Please make sure the backend server is running on http://localhost:8000</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Header />
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                ← Back to Posts
              </Link>
            </div>
            <div className="text-center text-muted-foreground mt-20">
              <p>Post not found.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <article className="max-w-3xl mx-auto">
          {/* Back to Posts Link */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              ← Back to Posts
            </Link>
          </div>
          
          {/* Post Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4">
            {post.title}
          </h1>

          {/* Post Metadata (Author and Date) */}
          <div className="flex items-center space-x-4 mb-8 text-zinc-500 dark:text-zinc-400">
            <span>By {post.author || "Zemenay Team"}</span>
            <span>•</span>
            {/* We will format the date nicely */}
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>
          
          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content}
          </div>
        </article>
      </main>
    </div>
  );
} 