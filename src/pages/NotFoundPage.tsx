import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="relative">
              <div className="text-9xl font-bold glitch-hover">
                <span className="neon-magenta">4</span>
                <span className="neon-cyan">0</span>
                <span className="neon-magenta">4</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <AlertTriangle className="h-6 w-6 neon-cyan" />
                <h1 className="text-2xl md:text-3xl font-bold">
                  <span className="neon-cyan">Page Not Found</span>
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Looks like you've wandered into uncharted digital territory. 
                The page you're looking for doesn't exist in our cyberspace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 glow-magenta group"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-glow-cyan hover:glow-cyan"
                >
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="pt-12 opacity-30">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="h-1 bg-primary glow-magenta animate-pulse" />
                <div className="h-1 bg-accent glow-cyan animate-pulse delay-75" />
                <div className="h-1 bg-primary glow-magenta animate-pulse delay-150" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
