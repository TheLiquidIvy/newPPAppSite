import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/theme-store';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-glow-cyan">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="text-2xl font-bold neon-magenta glitch-hover">
                PIXEL
              </div>
            </div>
            <div className="text-2xl font-bold neon-cyan glitch-hover">
              PLAQUE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-primary neon-magenta'
                    : 'text-foreground hover:text-accent hover:neon-cyan'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary glow-magenta" />
                )}
                <span className="absolute inset-0 border border-transparent group-hover:border-glow-cyan rounded-md transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="border-glow-cyan hover:glow-cyan transition-all duration-300"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 neon-cyan" />
              ) : (
                <Moon className="h-5 w-5 neon-magenta" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-glow-magenta hover:glow-magenta"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5 neon-magenta" />
              ) : (
                <Menu className="h-5 w-5 neon-magenta" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-glow-cyan animate-in slide-in-from-top-5 duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md transition-all duration-300 cyber-corners ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary neon-magenta border border-glow-magenta'
                    : 'text-foreground hover:bg-accent/10 hover:neon-cyan border border-transparent hover:border-glow-cyan'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-md transition-all duration-300 cyber-corners text-xs text-muted-foreground hover:bg-accent/10 hover:neon-cyan border border-transparent hover:border-glow-cyan"
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
