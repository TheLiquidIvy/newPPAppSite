import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { table } from '@devvai/devv-code-backend';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, User, Loader2, ArrowRight } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string;
  published: string;
  publishedAt: string;
}

const TABLE_ID = 'f2x3euicwdfk';

const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'technology', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'business', label: 'Business' },
  { value: 'tutorials', label: 'Tutorials' },
];

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const response = await table.getItems(TABLE_ID, {
        limit: 100,
        sort: '_id',
        order: 'desc',
      });
      // Only show published posts
      const publishedPosts = (response.items as BlogPost[]).filter(
        post => post.published === 'published'
      );
      setPosts(publishedPosts);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateReadTime = (excerpt: string) => {
    const words = excerpt.split(' ').length;
    const readTime = Math.ceil(words / 200); // Average reading speed
    return `${readTime} min read`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text-primary">
              The PixelPlaque Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tutorials, and stories from the digital frontier. Stay updated with
              the latest in web design, development, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
            <div className="w-full sm:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">No Articles Yet</h3>
              <p className="text-muted-foreground">
                {selectedCategory === 'all'
                  ? 'Check back soon for our latest insights'
                  : 'No articles found in this category'}
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post._id}
                  className="cyber-card overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid md:grid-cols-[300px,1fr] gap-6">
                    {/* Cover Image */}
                    <div className="aspect-video md:aspect-square overflow-hidden bg-muted">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:py-6 md:pr-6 md:pl-0 flex flex-col">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs uppercase tracking-wide">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {calculateReadTime(post.excerpt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Author & Tags */}
                      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>

                        {post.tags && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.split(',').slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-md bg-muted"
                              >
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Read More */}
                      <Button
                        variant="link"
                        className="gap-2 mt-4 self-start p-0 h-auto group/btn"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest articles, insights, and updates delivered to your inbox.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a href="/contact">
                Subscribe to Newsletter
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
