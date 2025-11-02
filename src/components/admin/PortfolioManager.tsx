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
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react';

interface PortfolioItem {
  _id: string;
  _uid: string;
  title: string;
  description: string;
  category: string;
  image: string;
  client: string;
  completionDate: string;
  featured: string;
  technologies: string;
  liveUrl?: string;
  createdAt: string;
}

const TABLE_ID = 'f2x3eui2wydc';

const categories = [
  { value: 'web-design', label: 'Web Design' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'content-generation', label: 'Content Generation' },
  { value: 'saas-ecommerce', label: 'SaaS & E-commerce' },
];

export function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const { user } = useAuthStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web-design',
    image: '',
    client: '',
    completionDate: new Date().toISOString().split('T')[0],
    featured: 'no',
    technologies: '',
    liveUrl: '',
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await table.getItems(TABLE_ID, {
        limit: 100,
        sort: '_id',
        order: 'desc',
      });
      setItems(response.items as PortfolioItem[]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load portfolio items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const itemData = {
        _uid: user.uid,
        ...formData,
        createdAt: new Date().toISOString(),
      };

      if (editingItem) {
        await table.updateItem(TABLE_ID, {
          _uid: editingItem._uid,
          _id: editingItem._id,
          ...formData,
        });
        toast({ title: 'Success', description: 'Portfolio item updated' });
      } else {
        await table.addItem(TABLE_ID, itemData);
        toast({ title: 'Success', description: 'Portfolio item created' });
      }

      resetForm();
      setDialogOpen(false);
      loadItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save portfolio item',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      client: item.client,
      completionDate: item.completionDate,
      featured: item.featured,
      technologies: item.technologies,
      liveUrl: item.liveUrl || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      await table.deleteItem(TABLE_ID, {
        _uid: item._uid,
        _id: item._id,
      });
      toast({ title: 'Success', description: 'Portfolio item deleted' });
      loadItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete portfolio item',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web-design',
      image: '',
      client: '',
      completionDate: new Date().toISOString().split('T')[0],
      featured: 'no',
      technologies: '',
      liveUrl: '',
    });
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-primary glow-text-primary">
            Portfolio Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your showcase projects
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for your portfolio project
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Completion Date *</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use Unsplash or other image hosting services
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies Used *</Label>
                <Input
                  id="technologies"
                  placeholder="React, TypeScript, Tailwind CSS"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL (Optional)</Label>
                <Input
                  id="liveUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured">Featured on Homepage?</Label>
                <Select
                  value={formData.featured}
                  onValueChange={(value) => setFormData({ ...formData, featured: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingItem ? 'Update' : 'Create'} Portfolio Item
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
      ) : items.length === 0 ? (
        <Card className="cyber-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Portfolio Items Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by adding your first portfolio project
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item._id} className="cyber-card overflow-hidden group">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                    <CardDescription>{item.client}</CardDescription>
                  </div>
                  {item.featured === 'yes' && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      Featured
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.technologies.split(',').slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-muted"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                {item.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    asChild
                  >
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
