import { useState, useEffect } from 'react';
import { table } from '@devvai/devv-code-backend';
import { useAuthStore } from '@/store/auth-store';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus, Pencil, Trash2, Eye, Calendar, Loader2 } from 'lucide-react';

interface BlogPost {
  _id: string;
  _uid: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string;
  published: string;
  publishedAt: string;
  createdAt: string;
}

const TABLE_ID = 'f2x3euicwdfk';

const categories = [
  { value: 'technology', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'business', label: 'Business' },
  { value: 'tutorials', label: 'Tutorials' },
];

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: '',
    category: 'technology',
    tags: '',
    published: 'draft',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await table.getItems(TABLE_ID, {
        limit: 100,
        sort: '_id',
        order: 'desc',
      });
      setPosts(response.items as BlogPost[]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load blog posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingPost ? formData.slug : generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const now = new Date().toISOString();
      const postData = {
        _uid: user.uid,
        ...formData,
        publishedAt: formData.published === 'published' ? now : '',
        createdAt: now,
      };

      if (editingPost) {
        await table.updateItem(TABLE_ID, {
          _uid: editingPost._uid,
          _id: editingPost._id,
          ...formData,
          publishedAt: formData.published === 'published' ? now : editingPost.publishedAt,
        });
        toast({ title: 'Success', description: 'Blog post updated' });
      } else {
        await table.addItem(TABLE_ID, postData);
        toast({ title: 'Success', description: 'Blog post created' });
      }

      resetForm();
      setDialogOpen(false);
      loadPosts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save blog post',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      author: post.author,
      category: post.category,
      tags: post.tags,
      published: post.published,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await table.deleteItem(TABLE_ID, {
        _uid: post._uid,
        _id: post._id,
      });
      toast({ title: 'Success', description: 'Blog post deleted' });
      loadPosts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      author: '',
      category: 'technology',
      tags: '',
      published: 'draft',
    });
    setEditingPost(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-text-primary">
            Blog Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Create and manage blog posts
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </DialogTitle>
              <DialogDescription>
                Write and publish your blog content
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated from title, or customize it
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={2}
                  placeholder="A brief summary of the post..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={8}
                  placeholder="Write your blog post content here... (supports HTML and Markdown)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
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

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL *</Label>
                <Input
                  id="coverImage"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="react, typescript, web development"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="published">Status *</Label>
                <Select
                  value={formData.published}
                  onValueChange={(value) => setFormData({ ...formData, published: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingPost ? 'Update' : 'Create'} Post
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <Card className="cyber-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Blog Posts Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start creating engaging content for your blog
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post._id} className="cyber-card">
              <div className="flex gap-4">
                <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                        <CardDescription className="flex items-center gap-3 mt-1">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span className="capitalize">{post.category}</span>
                          {post.published === 'published' && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.publishedAt)}
                              </span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${
                          post.published === 'published'
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-muted text-muted-foreground border-border'
                        }`}
                      >
                        {post.published === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3 flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="gap-2 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleEdit(post)}
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(post)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
