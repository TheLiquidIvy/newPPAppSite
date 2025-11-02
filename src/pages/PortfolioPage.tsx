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
import { ExternalLink, Loader2 } from 'lucide-react';

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  client: string;
  completionDate: string;
  technologies: string;
  liveUrl?: string;
}

const TABLE_ID = 'f2x3eui2wydc';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'content-generation', label: 'Content Generation' },
  { value: 'saas-ecommerce', label: 'SaaS & E-commerce' },
];

export function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const response = await table.getItems(TABLE_ID, {
        limit: 100,
        sort: '_id',
        order: 'desc',
      });
      setItems(response.items as PortfolioItem[]);
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text-primary">
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our collection of cutting-edge digital projects. Each piece showcases
              our commitment to innovation, design excellence, and client success.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Showing {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}
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

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : filteredItems.length === 0 ? (
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground">
                {selectedCategory === 'all'
                  ? 'Check back soon for our latest projects'
                  : 'No projects found in this category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  className="cyber-card group overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {categories.find(c => c.value === item.category)?.label || item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.completionDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      Client: {item.client}
                    </p>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.split(',').slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-muted"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* View Button */}
                    {item.liveUrl && (
                      <Button
                        variant="outline"
                        className="w-full gap-2 group/btn"
                        asChild
                      >
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          View Live Project
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create something amazing together. Get in touch and let's discuss your vision.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a href="/contact">
                Get Started
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
