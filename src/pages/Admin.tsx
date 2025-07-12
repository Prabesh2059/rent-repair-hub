import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Building2,
  MessageSquare,
  Star,
  MapPin,
  LogOut
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminBranches from "@/components/admin/AdminBranches";
import AdminReviews from "@/components/admin/AdminReviews";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Checking admin authentication...");
    // Check if user is authenticated
    const isAuth = sessionStorage.getItem('adminAuth') === 'true';
    console.log("Auth status:", isAuth);
    
    if (!isAuth) {
      console.log("Not authenticated, redirecting to login");
      navigate('/login');
    } else {
      console.log("Authenticated, showing admin panel");
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    console.log("Logging out...");
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const stats = [
    {
      title: "Total Properties",
      value: "1,247",
      icon: Building2,
      change: "+12%"
    },
    {
      title: "Active Users",
      value: "856",
      icon: Users,
      change: "+8%"
    },
    {
      title: "Monthly Revenue",
      value: "रू 45,67,890",
      icon: BarChart3,
      change: "+15%"
    },
    {
      title: "Client Reviews",
      value: "324",
      icon: Star,
      change: "+5%"
    }
  ];

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006d4e] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your real estate platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-[#006d4e]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="branches">Branches</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm">New property listed in Kathmandu</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm">Client review submitted</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <p className="text-sm">Property inquiry received</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Properties
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Manage Inquiries
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    System Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branches">
            <AdminBranches />
          </TabsContent>

          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive email notifications for new inquiries</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Language Settings</h4>
                    <p className="text-sm text-gray-600">Manage supported languages</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Backup & Restore</h4>
                    <p className="text-sm text-gray-600">Backup system data</p>
                  </div>
                  <Button variant="outline" size="sm">Backup Now</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
