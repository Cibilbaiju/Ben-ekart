
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Eye, EyeOff, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login with:', { email: formData.email });
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          console.error('Login error:', error);
          toast({
            title: "Login Failed",
            description: error.message || "Invalid email or password",
            variant: "destructive"
          });
        } else {
          console.log('Login successful');
          toast({
            title: "Welcome back!",
            description: "You have been successfully logged in."
          });
          navigate('/dashboard');
        }
      } else {
        console.log('Attempting signup with:', { 
          email: formData.email, 
          firstName: formData.firstName, 
          lastName: formData.lastName 
        });
        
        const { error } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address: formData.address
        });
        
        if (error) {
          console.error('Signup error:', error);
          toast({
            title: "Sign Up Failed",
            description: error.message || "Failed to create account",
            variant: "destructive"
          });
        } else {
          console.log('Signup successful');
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account, or you can sign in directly."
          });
          // Switch to login mode after successful signup
          setIsLogin(true);
          setFormData(prev => ({ ...prev, password: '' }));
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return false;
    }
    if (!isLogin && (!formData.firstName || !formData.lastName)) {
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-md">
        {/* Home Button */}
        <div className="mb-6">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-white hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg border border-white/10">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <p className="text-gray-400">
              {isLogin
                ? "Sign in to your account to continue"
                : "Join us for exclusive offers and faster checkout"
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="border-gray-700 bg-gray-900 text-gray-100 focus:border-blue-500"
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="border-gray-700 bg-gray-900 text-gray-100 focus:border-blue-500"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-700 bg-gray-900 text-gray-100 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-300">Address (Optional)</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, City, State"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="border-gray-700 bg-gray-900 text-gray-100 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email" className="text-gray-300">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-gray-700 bg-gray-900 text-gray-100 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="border-gray-700 bg-gray-900 text-gray-100 pr-10 focus:border-blue-500"
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-800 to-purple-900 hover:from-blue-900 hover:to-purple-950 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-white"
                disabled={isLoading || !validateForm()}
              >
                {isLoading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  className="p-0 ml-1 text-blue-400 hover:text-purple-400"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData(prev => ({ ...prev, password: '' }));
                  }}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
