import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Globe, Palette, FileText, ShoppingCart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const HomePage = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Design',
      description: 'Stunning, user-centric designs that captivate and convert.',
      color: 'magenta',
    },
    {
      icon: Zap,
      title: 'Web Development',
      description: 'Cutting-edge development with modern technologies.',
      color: 'cyan',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Visual identity that makes your brand unforgettable.',
      color: 'magenta',
    },
    {
      icon: FileText,
      title: 'Content Generation',
      description: 'Compelling content that resonates with your audience.',
      color: 'cyan',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Setup',
      description: 'Full-featured online stores that drive sales.',
      color: 'magenta',
    },
    {
      icon: Settings,
      title: 'SaaS Solutions',
      description: 'Scalable software solutions for modern businesses.',
      color: 'cyan',
    },
  ];

  const stats = [
    { value: '200+', label: 'Projects Completed' },
    { value: '150+', label: 'Happy Clients' },
    { value: '50+', label: 'Team Members' },
    { value: '5+', label: 'Years Experience' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold glitch-hover">
                <span className="neon-magenta">DIGITAL</span>{' '}
                <span className="neon-cyan">INNOVATION</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground/80">
                Powered by <span className="neon-magenta">PixelPlaque</span>
              </h2>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We craft electrifying digital experiences that push boundaries. 
              From web design to SaaS solutions, we transform your vision into reality 
              with cutting-edge technology and cyberpunk aesthetics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground glow-magenta pulse-glow group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-glow-cyan hover:glow-cyan"
                >
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="relative p-6 border border-border rounded-lg backdrop-blur-sm hover:border-glow-magenta transition-all duration-300 cyber-corners group"
                >
                  <div className="text-3xl md:text-4xl font-bold neon-magenta group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated corner decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary opacity-30 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-accent opacity-30 animate-pulse" />
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="neon-cyan">Our</span>{' '}
              <span className="neon-magenta">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions to elevate your online presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className={`p-6 bg-card/50 backdrop-blur-sm border-border hover:border-glow-${service.color} transition-all duration-300 group relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-lg bg-${service.color === 'magenta' ? 'primary' : 'accent'}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${service.color === 'magenta' ? 'neon-magenta' : 'neon-cyan'}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:neon-magenta transition-all">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="border-glow-cyan hover:glow-cyan group"
              >
                Explore All Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-lg border border-glow-magenta bg-card/30 backdrop-blur-sm cyber-corners">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to <span className="neon-magenta">Electrify</span> Your Digital Presence?
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's collaborate and create something extraordinary together.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 glow-magenta group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
