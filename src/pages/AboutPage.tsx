import { Users, Target, Zap, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';

const AboutPage = () => {
  const values = [
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We push boundaries and embrace cutting-edge technologies to deliver next-generation solutions.',
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our mission. We collaborate closely to understand and exceed your expectations.',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes that drive your business growth and digital transformation.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Quality is non-negotiable. We deliver exceptional work that stands out in the digital landscape.',
    },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Sarah Martinez',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'James Wilson',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      name: 'Emily Park',
      role: 'UX Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold glitch-hover">
              <span className="neon-cyan">About</span>{' '}
              <span className="neon-magenta">PixelPlaque</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We are a digital agency at the intersection of creativity and technology. 
              Since our inception, we've been crafting electrifying digital experiences 
              that push boundaries and redefine what's possible in the digital realm.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-glow-cyan">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-magenta">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Born in the digital underground, PixelPlaque emerged from a vision to merge 
                  the rebellious energy of cyberpunk culture with professional digital excellence. 
                  We saw a world where businesses needed more than just websites – they needed 
                  digital experiences that electrify, engage, and convert.
                </p>
                <p>
                  Our team of digital rebels, designers, developers, and strategists came together 
                  with one mission: to help businesses break free from digital mediocrity and 
                  embrace innovation. We don't just build websites; we craft digital ecosystems 
                  that pulse with energy and purpose.
                </p>
                <p>
                  Today, we're proud to have helped over 150 clients transform their digital 
                  presence, from startups to established enterprises. Each project is a new 
                  adventure in pushing boundaries and creating something truly extraordinary.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="neon-magenta">Our</span>{' '}
              <span className="neon-cyan">Values</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that drive everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-glow-magenta transition-all duration-300 group cyber-corners"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 neon-magenta" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:neon-cyan transition-all">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="neon-cyan">Meet The</span>{' '}
              <span className="neon-magenta">Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The digital rebels behind your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-glow-cyan transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-1 group-hover:neon-magenta transition-all">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground neon-cyan">
                    {member.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
