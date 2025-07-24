import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Calendar, User, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/posts/')({
  component: Posts,
});

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  comments: number;
  category: string;
}

// Mock API function
const fetchPosts = async (): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: 1,
      title: 'Getting Started with React 19',
      excerpt: 'Learn about the latest features and improvements in React 19, including better performance and new hooks.',
      author: 'John Doe',
      publishDate: '2024-12-01',
      comments: 24,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Building Modern UIs with Tailwind CSS',
      excerpt: 'Discover best practices for creating beautiful and responsive user interfaces with Tailwind CSS.',
      author: 'Jane Smith',
      publishDate: '2024-11-28',
      comments: 18,
      category: 'Design'
    },
    {
      id: 3,
      title: 'State Management with TanStack Query',
      excerpt: 'Master server state management in React applications using TanStack Query for better data fetching.',
      author: 'Mike Johnson',
      publishDate: '2024-11-25',
      comments: 32,
      category: 'Development'
    },
    {
      id: 4,
      title: 'TypeScript Best Practices',
      excerpt: 'Learn advanced TypeScript patterns and practices to write more maintainable and type-safe code.',
      author: 'Sarah Wilson',
      publishDate: '2024-11-22',
      comments: 15,
      category: 'Programming'
    },
    {
      id: 5,
      title: 'Optimizing React Performance',
      excerpt: 'Techniques and strategies for improving React application performance and user experience.',
      author: 'Alex Brown',
      publishDate: '2024-11-20',
      comments: 41,
      category: 'Performance'
    },
    {
      id: 6,
      title: 'Modern JavaScript Features',
      excerpt: 'Explore the latest JavaScript features and how they can improve your development workflow.',
      author: 'Emily Davis',
      publishDate: '2024-11-18',
      comments: 27,
      category: 'JavaScript'
    },
  ];
};

function Posts() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error loading posts</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        <div className="text-sm text-gray-600">
          {posts ? `${posts.length} posts` : '...'}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">Loading posts...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const categoryColors: Record<string, string> = {
    Technology: 'bg-blue-100 text-blue-800',
    Design: 'bg-purple-100 text-purple-800',
    Development: 'bg-green-100 text-green-800',
    Programming: 'bg-yellow-100 text-yellow-800',
    Performance: 'bg-red-100 text-red-800',
    JavaScript: 'bg-orange-100 text-orange-800',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
            {post.category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 hover:text-primary cursor-pointer">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.publishDate).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {post.comments}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}