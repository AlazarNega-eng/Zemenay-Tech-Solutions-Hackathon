import { Header } from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Latest Articles
        </h1>
        <p className="text-muted-foreground">
          A collection of thoughts, stories, and ideas.
        </p>

        {/* Post list will go here later */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
           {/* Example Post Card - We will make this dynamic later */}
           <div className="bg-card p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow border">
              <h2 className="text-2xl font-bold mb-2">My First Post</h2>
              <p className="text-muted-foreground">This is a short excerpt of the blog post content...</p>
           </div>
           <div className="bg-card p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow border">
              <h2 className="text-2xl font-bold mb-2">Another Article</h2>
              <p className="text-muted-foreground">Exploring the depths of modern web development...</p>
           </div>
        </div>
      </main>
    </div>
  );
}
