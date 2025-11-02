import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@pixelplaque.com',
      link: 'mailto:hello@pixelplaque.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Cyber District, Digital City',
      link: null,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold glitch-hover">
              <span className="neon-cyan">Get In</span>{' '}
              <span className="neon-magenta">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your digital transformation? Let's connect and 
              discuss how we can bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card 
                    key={index}
                    className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-glow-cyan transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 neon-cyan" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 group-hover:neon-magenta transition-all">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-sm text-muted-foreground hover:neon-cyan transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}

              {/* Office Hours */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-glow-magenta cyber-corners">
                <h3 className="font-bold mb-4 neon-magenta text-lg">
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="neon-cyan">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="neon-cyan">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground/50">Closed</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-glow-cyan">
                <h2 className="text-2xl font-bold mb-6 neon-magenta">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="border-border focus:border-glow-magenta transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="border-border focus:border-glow-magenta transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="border-border focus:border-glow-magenta transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project..."
                      rows={6}
                      className="border-border focus:border-glow-magenta transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 glow-magenta group"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-glow-cyan max-w-6xl mx-auto">
            <div className="aspect-video bg-muted relative flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 neon-cyan mx-auto" />
                <p className="text-muted-foreground">
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
