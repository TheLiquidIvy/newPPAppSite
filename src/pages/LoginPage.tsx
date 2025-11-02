import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@devvai/devv-code-backend';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Sparkles } from 'lucide-react';

export function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await auth.sendOTP(email);
      setStep('otp');
      toast({
        title: 'Code Sent',
        description: 'Check your email for the verification code.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await auth.verifyOTP(email, otp);
      setUser(response.user);
      toast({
        title: 'Welcome Back',
        description: 'Successfully logged in!',
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Invalid code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary glow-primary" />
            <h1 className="text-3xl font-bold text-primary glow-text-primary">PixelPlaque</h1>
          </div>
          <p className="text-muted-foreground">Admin Portal Access</p>
        </div>

        {/* Login Card */}
        <div className="cyber-card p-8">
          {step === 'email' ? (
            <div key="email">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 glow-border-primary">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email to receive a verification code
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@pixelplaque.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </Button>
              </form>
            </div>
          ) : (
            <div key="otp">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 glow-border-primary">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Enter Code</h2>
                <p className="text-sm text-muted-foreground">
                  We sent a verification code to <span className="text-primary">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="bg-background/50 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                  }}
                >
                  Use Different Email
                </Button>
              </form>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
