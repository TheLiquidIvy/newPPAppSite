import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card border-t border-glow-cyan mt-20">
      <div className="cyber-grid">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold neon-magenta">PIXEL</span>
                <span className="text-2xl font-bold neon-cyan">PLAQUE</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Cutting-edge digital solutions with a cyberpunk edge. 
                We transform ideas into electrifying digital experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4 neon-cyan">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-accent hover:neon-cyan transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-accent hover:neon-cyan transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-accent hover:neon-cyan transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-muted-foreground hover:text-accent hover:neon-cyan transition-colors">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold mb-4 neon-magenta">Services</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Web Design</li>
                <li className="text-muted-foreground">Web Development</li>
                <li className="text-muted-foreground">Graphic Design</li>
                <li className="text-muted-foreground">Content Generation</li>
                <li className="text-muted-foreground">SaaS & E-commerce</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold mb-4 neon-cyan">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4 mt-0.5 text-accent" />
                  <span>hello@pixelplaque.com</span>
                </li>
                <li className="flex items-start space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4 mt-0.5 text-accent" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                  <span>Cyber District, Digital City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} <span className="neon-magenta">PixelPlaque</span>. All rights reserved. 
              <span className="mx-2">|</span>
              <Link to="/admin" className="hover:neon-cyan transition-colors">
                Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
