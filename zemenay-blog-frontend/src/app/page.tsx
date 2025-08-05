'use client';

import { Header } from "./components/header";
import { Post } from "./lib/definitions";
import { useState, useEffect } from "react";
import Link from "next/link"; // <-- Import the Link component

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts from: http://localhost:8000/api/posts');
        const res = await fetch('http://localhost:8000/api/posts', { cache: 'no-store' });

        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        if (!res.ok) {
          console.error('Failed to fetch posts. Status:', res.status);
          throw new Error(`Failed to fetch posts: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
                  {/* We'll just show a snippet of the content for now */}
                  <p className="text-muted-foreground mb-4">
                    {post.content.substring(0, 100)}...
                  </p>
                  {/* Add a "Read More" link */}
                  <span className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Show a message if there are no posts
          <p className="text-center text-muted-foreground mt-20">No posts found. Go ahead and create one!</p>
        )}
      </main>
    </div>
  );
}
