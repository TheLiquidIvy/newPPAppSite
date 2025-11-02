import { Globe, Code, Palette, FileText, ShoppingCart, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const ServicesPage = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Design',
      tagline: 'Visual Excellence',
      description: 'Create stunning, user-centric designs that captivate audiences and drive engagement. Our designs blend aesthetics with functionality, ensuring every pixel serves a purpose.',
      features: [
        'Responsive Design',
        'UI/UX Strategy',
        'Brand Integration',
        'Wireframing & Prototyping',
        'Design Systems',
      ],
      color: 'magenta',
    },
    {
      icon: Code,
      title: 'Web Development',
      tagline: 'Cutting-Edge Technology',
      description: 'Build robust, scalable web applications using the latest technologies. From simple landing pages to complex web platforms, we deliver solutions that perform.',
      features: [
        'React & Modern Frameworks',
        'API Integration',
        'Performance Optimization',
        'SEO Implementation',
        'Progressive Web Apps',
      ],
      color: 'cyan',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      tagline: 'Brand Identity',
      description: 'Craft memorable visual identities that make your brand stand out. From logos to complete brand guidelines, we create cohesive visual languages.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Marketing Materials',
        'Social Media Graphics',
        'Print & Digital Assets',
      ],
      color: 'magenta',
    },
    {
      icon: FileText,
      title: 'Content Generation',
      tagline: 'Strategic Storytelling',
      description: 'Develop compelling content that resonates with your audience and drives action. Our content strategies combine creativity with data-driven insights.',
      features: [
        'Content Strategy',
        'Copywriting',
        'SEO Content',
        'Blog Management',
        'Social Media Content',
      ],
      color: 'cyan',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Setup',
      tagline: 'Online Store Solutions',
      description: 'Launch fully-featured online stores that drive sales and provide seamless shopping experiences. We handle everything from setup to optimization.',
      features: [
        'Platform Setup',
        'Payment Integration',
        'Inventory Management',
        'Order Processing',
        'Analytics & Reporting',
      ],
      color: 'magenta',
    },
    {
      icon: Settings,
      title: 'SaaS Solutions',
      tagline: 'Software as a Service',
      description: 'Develop scalable SaaS platforms that solve real business problems. From MVP to enterprise-grade solutions, we build software that grows with you.',
      features: [
        'Custom Development',
        'Cloud Infrastructure',
        'User Management',
        'Subscription Billing',
        'Maintenance & Support',
      ],
      color: 'cyan',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We dive deep into your business, goals, and challenges to understand your needs.',
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'We develop a comprehensive strategy and roadmap tailored to your objectives.',
    },
    {
      step: '03',
      title: 'Design',
      description: 'Our team creates stunning visuals and prototypes that bring your vision to life.',
    },
    {
      step: '04',
      title: 'Development',
      description: 'We build robust, scalable solutions using cutting-edge technologies.',
    },
    {
      step: '05',
      title: 'Launch',
      description: 'We deploy your project with precision and ensure a smooth go-live.',
    },
    {
      step: '06',
      title: 'Support',
      description: 'We provide ongoing maintenance and optimization to ensure continued success.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold glitch-hover">
              <span className="neon-magenta">Our</span>{' '}
              <span className="neon-cyan">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive digital solutions designed to transform your business 
              and elevate your online presence in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className={`p-8 bg-card/50 backdrop-blur-sm border-border hover:border-glow-${service.color} transition-all duration-300 group cyber-corners`}
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-14 h-14 rounded-lg bg-${service.color === 'magenta' ? 'primary' : 'accent'}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-7 w-7 ${service.color === 'magenta' ? 'neon-magenta' : 'neon-cyan'}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:neon-magenta transition-all">
                        {service.title}
                      </h3>
                      <p className={`text-sm ${service.color === 'magenta' ? 'neon-magenta' : 'neon-cyan'} font-medium`}>
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${service.color === 'magenta' ? 'primary' : 'accent'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="neon-cyan">Our</span>{' '}
              <span className="neon-magenta">Process</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <Card 
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-glow-cyan transition-all duration-300 group"
              >
                <div className="text-5xl font-bold neon-magenta mb-4 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:neon-cyan transition-all">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
    src/pages/ServicesPage.tsx            </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-lg border border-glow-magenta bg-card/30 backdrop-blur-sm cyber-corners">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to <span className="neon-cyan">Transform</span> Your Business?
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's discuss your project and create something extraordinary together.
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

export default ServicesPage;
