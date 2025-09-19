
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to the Health Monitoring System",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[pulse_4s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[pulse_4s_ease-in-out_infinite_2s]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with enhanced animations */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full animate-[pulse_2s_ease-in-out_infinite] hover:animate-none hover:scale-110 transition-transform duration-300">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2 animate-[fade-in_0.8s_ease-out_0.2s_both]">
            Dockyard Health Monitor
          </h1>
          <p className="text-gray-600 animate-[fade-in_0.8s_ease-out_0.4s_both]">
            Comprehensive Health Analytics Platform
          </p>
        </div>
        
        {/* Enhanced card with hover effects */}
        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 animate-[scale-in_0.5s_ease-out_0.6s_both]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Access your health dashboard and monitoring tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:scale-[1.02] hover:border-blue-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:scale-[1.02] hover:border-blue-300"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg transform active:scale-95" 
                disabled={isLoading}
              >
                <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  Sign In
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </Button>
            </form>
            
            {/* Enhanced demo credentials section */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
              <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Demo Credentials:
              </p>
              <div className="text-xs text-gray-600 space-y-1">
                <p className="hover:text-blue-600 transition-colors cursor-default">
                  <strong>Medical Officer:</strong> dr.johnson@dockyard.com
                </p>
                <p className="hover:text-blue-600 transition-colors cursor-default">
                  <strong>Personnel:</strong> john.smith@dockyard.com
                </p>
                <p className="hover:text-blue-600 transition-colors cursor-default">
                  <strong>Password:</strong> password123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer animation */}
        <div className="text-center mt-8 text-sm text-gray-500 animate-[fade-in_1s_ease-out_1s_both]">
          <p>Secure • Reliable • Advanced Healthcare Analytics</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
