const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mock blog posts data
const mockPosts = [
  {
    id: 1,
    title: "Welcome to Zemenay Tech Blog",
    content: "We're excited to launch our new blog platform where we'll share insights about technology, gaming, and our community initiatives. This is our first post, and we have many exciting topics to cover in the coming weeks. Stay tuned for deep dives into game development, tech trends, and stories from our vibrant Ethiopian tech community.",
    author: "Zemenay Team",
    image: null,
    created_at: "2024-08-12T10:00:00Z",
    updated_at: "2024-08-12T10:00:00Z"
  },
  {
    id: 2,
    title: "The Future of Game Development in Ethiopia",
    content: "Ethiopia's gaming industry is experiencing unprecedented growth. From indie developers creating innovative mobile games to ambitious AAA studios, the landscape is evolving rapidly. In this post, we explore the challenges and opportunities facing Ethiopian game developers, the role of government support, and how our community is building bridges to global markets. We'll also discuss the importance of preserving Ethiopian culture in game narratives.",
    author: "Alex Tesfaye",
    image: null,
    created_at: "2024-08-11T14:30:00Z",
    updated_at: "2024-08-11T14:30:00Z"
  },
  {
    id: 3,
    title: "Building Community Through Technology",
    content: "Technology has the power to bring people together in unprecedented ways. At Zemenay, we've witnessed firsthand how digital platforms can foster collaboration, learning, and innovation within communities. This article explores our journey in building tech communities across Ethiopia, the lessons we've learned, and our vision for the future. We'll share success stories, challenges overcome, and the impact technology has had on local communities.",
    author: "Sara Bekele",
    image: null,
    created_at: "2024-08-10T09:15:00Z",
    updated_at: "2024-08-10T09:15:00Z"
  },
  {
    id: 4,
    title: "Understanding Modern Web Development Frameworks",
    content: "The web development landscape is constantly evolving, with new frameworks and tools emerging regularly. From React and Vue.js to cutting-edge solutions like Next.js and Nuxt.js, developers have more options than ever. This comprehensive guide breaks down the most popular frameworks of 2024, their strengths and weaknesses, and how to choose the right tool for your project. We'll also include practical examples and performance comparisons.",
    author: "Michael Hadis",
    image: null,
    created_at: "2024-08-09T16:45:00Z",
    updated_at: "2024-08-09T16:45:00Z"
  },
  {
    id: 5,
    title: "AI and Machine Learning: Opportunities in Africa",
    content: "Artificial Intelligence and Machine Learning are transforming industries worldwide, and Africa is uniquely positioned to benefit from these technologies. From solving local challenges in agriculture and healthcare to creating innovative fintech solutions, AI/ML presents enormous opportunities. This article examines successful AI implementations across African countries, discusses the talent pipeline, and explores how organizations can get started with AI initiatives.",
    author: "Dr. Hanan Ahmed",
    image: null,
    created_at: "2024-08-08T11:20:00Z",
    updated_at: "2024-08-08T11:20:00Z"
  },
  {
    id: 6,
    title: "Cybersecurity Best Practices for Small Businesses",
    content: "As digital transformation accelerates, cybersecurity becomes increasingly critical for businesses of all sizes. Small and medium enterprises are particularly vulnerable due to limited resources and expertise. This guide provides practical, cost-effective cybersecurity strategies that small businesses can implement immediately. We cover everything from basic password hygiene to advanced threat detection, helping business owners protect their digital assets without breaking the bank.",
    author: "Dawit Kebede",
    image: null,
    created_at: "2024-08-07T13:00:00Z",
    updated_at: "2024-08-07T13:00:00Z"
  }
];

// GET /api/posts - Get all posts with pagination
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  const paginatedPosts = mockPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockPosts.length / perPage);
  
  res.json({
    data: paginatedPosts,
    current_page: page,
    last_page: totalPages,
    per_page: perPage,
    total: mockPosts.length
  });
});

// GET /api/posts/:id - Get single post
app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = mockPosts.find(p => p.id === postId);
  
  if (!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }
  
  res.json(post);
});

// POST /api/posts - Create new post
app.post('/api/posts', (req, res) => {
  const newPost = {
    id: mockPosts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || null,
    image: req.body.image || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockPosts.unshift(newPost);
  res.status(201).json(newPost);
});

// PUT /api/posts/:id - Update post
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }
  
  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    ...req.body,
    updated_at: new Date().toISOString()
  };
  
  res.json(mockPosts[postIndex]);
});

// DELETE /api/posts/:id - Delete post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = mockPosts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }
  
  mockPosts.splice(postIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Mock Blog API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock Blog API server running on http://0.0.0.0:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /api/posts     - Get all posts`);
  console.log(`  GET    /api/posts/:id - Get single post`);
  console.log(`  POST   /api/posts     - Create new post`);
  console.log(`  PUT    /api/posts/:id - Update post`);
  console.log(`  DELETE /api/posts/:id - Delete post`);
  console.log(`  GET    /api/health    - Health check`);
});