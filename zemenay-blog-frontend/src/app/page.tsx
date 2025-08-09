'use client';

import { Header } from "./components/header";
import { Post } from "./lib/definitions";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For client-side requests, use the environment variable or fallback to localhost
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const url = `${apiUrl}/posts`;
        
        console.log('Fetching posts from:', url);
        
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const res = await fetch(url, { 
          cache: 'no-store',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        if (!res.ok) {
          console.error('Failed to fetch posts. Status:', res.status);
          throw new Error(`Failed to fetch posts: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched posts:', data);
        
        // Handle paginated response
        const postsData = data.data || data;
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error instanceof Error && error.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          setError(error instanceof Error ? error.message : 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPosts();
    }
  }, [mounted]);

  // Helper function to format date consistently
  const formatDate = (dateString: string) => {
    if (!mounted) return ''; // Return empty string during SSR to prevent hydration mismatch
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-foreground">
            Latest Articles
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            A collection of thoughts, stories, and ideas.
          </p>
          <div className="text-center text-muted-foreground mt-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading posts...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-foreground">
            Latest Articles
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            A collection of thoughts, stories, and ideas.
          </p>
          <div className="text-center text-red-500 mt-20">
            <p>Error loading posts: {error}</p>
            <p className="mt-4">Please make sure the backend server is running on http://localhost:8000</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-foreground">
          Latest Articles
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          A collection of thoughts, stories, and ideas.
        </p>

        {/* Check if there are posts and display them dynamically */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              // Wrap the card div with a Link component
              <Link href={`/posts/${post.id}`} key={post.id}>
                <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border h-full">
                  <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400 hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(post.created_at)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground mt-20">
            <p>No posts found.</p>
            <p className="mt-2">Check the admin panel to create some posts!</p>
          </div>
        )}
      </main>
    </div>
  );
}
