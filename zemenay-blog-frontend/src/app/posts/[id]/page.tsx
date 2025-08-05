// app/posts/[id]/page.tsx

import { Header } from "../../components/header";
import { Post } from "../../lib/definitions";
import { notFound } from "next/navigation";
import { format } from 'date-fns'; // We'll use this for nice date formatting
import Link from "next/link";

// Function to fetch a single post by its ID
async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, { cache: 'no-store' });

  // The API will return a 404 if not found, so we check for that
  if (!res.ok) {
    return null;
  }

  return res.json();
}


// This is the page component itself
// It receives `params` which contains the dynamic route segments, e.g., { id: '1' }
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  // If the post doesn't exist, show a 404 page
  if (!post) {
    notFound();
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
              {format(new Date(post.created_at), 'MMMM dd, yyyy')}
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