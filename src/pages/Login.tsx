
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Specific admin credentials
  const ADMIN_EMAIL = "admin";
  const ADMIN_PASSWORD = "admin123";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      // Set admin login status
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUser', JSON.stringify({
        username: ADMIN_EMAIL,
        loginTime: new Date().toISOString()
      }));
      
      toast({
        title: "Login Successful!",
        description: "Welcome to the admin dashboard.",
      });
      
      // Navigate to admin panel immediately
      navigate('/admin', { replace: true });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid Username or password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <Card className="shadow-xl animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <p className="text-gray-600">Access the admin dashboard</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Username</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                    className="pl-10 transition-colors duration-200 focus:border-[#006d4e]"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10 transition-colors duration-200 focus:border-[#006d4e]"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-lg py-3 transition-all duration-200 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login to Admin Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
