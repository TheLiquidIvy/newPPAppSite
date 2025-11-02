import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PortfolioManager } from '@/components/admin/PortfolioManager';
import { BlogManager } from '@/components/admin/BlogManager';
import { LogOut, Sparkles, Briefcase, BookOpen } from 'lucide-react';

export function AdminDashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('portfolio');

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary glow-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary glow-text-primary">
                  PixelPlaque Admin
                </h1>
                <p className="text-sm text-muted-foreground">Content Management Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="portfolio" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-0">
            <PortfolioManager />
          </TabsContent>

          <TabsContent value="blog" className="mt-0">
            <BlogManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
