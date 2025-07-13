
import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Check, X, Users, Building, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const Admin = () => {
  const { t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Modern Family Home",
      location: "Kathmandu, Nepal",
      price: "रू 1,50,00,000",
      description: "Beautiful modern home with garden",
      propertyType: "house",
      bedrooms: "4",
      bathrooms: "3",
      sqft: "2400",
      contactName: "John Doe",
      contactEmail: "john@example.com",
      contactPhone: "+977-9841234567",
      status: 'pending',
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Pokhara, Nepal",
      price: "रू 85,00,000",
      description: "Luxury apartment with city view",
      propertyType: "apartment",
      bedrooms: "2",
      bathrooms: "2",
      sqft: "1200",
      contactName: "Jane Smith",
      contactEmail: "jane@example.com",
      contactPhone: "+977-9851234567",
      status: 'approved',
      createdAt: "2024-01-10"
    }
  ]);

  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin", joinDate: "2024-01-10" },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleApproveProperty = (id: number) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, status: 'approved' as const } : prop
    ));
    toast({
      title: "Property Approved",
      description: "The property has been approved and is now live.",
    });
  };

  const handleRejectProperty = (id: number) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, status: 'rejected' as const } : prop
    ));
    toast({
      title: "Property Rejected",
      description: "The property has been rejected.",
    });
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(prev => prev.filter(prop => prop.id !== id));
    toast({
      title: "Property Deleted",
      description: "The property has been permanently deleted.",
    });
  };

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const approvedProperties = properties.filter(p => p.status === 'approved');
  const rejectedProperties = properties.filter(p => p.status === 'rejected');

  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: Building,
      color: "bg-[#006d4e]"
    },
    {
      title: "Pending Approval",
      value: pendingProperties.length,
      icon: Eye,
      color: "bg-yellow-500"
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Revenue",
      value: "रू 2,50,000",
      icon: DollarSign,
      color: "bg-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-[#006d4e]">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#006d4e] text-[#006d4e] hover:bg-[#006d4e] hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'properties', label: 'Properties' },
              { id: 'users', label: 'Users' },
              { id: 'settings', label: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#006d4e] text-[#006d4e]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#006d4e]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.slice(0, 5).map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-gray-600">{property.location}</p>
                      </div>
                      <Badge 
                        variant={property.status === 'approved' ? 'default' : property.status === 'pending' ? 'secondary' : 'destructive'}
                        className={property.status === 'approved' ? 'bg-[#006d4e]' : ''}
                      >
                        {property.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Pending Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#006d4e] flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Pending Properties ({pendingProperties.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{property.title}</h3>
                          <p className="text-gray-600">{property.location}</p>
                          <p className="font-bold text-[#006d4e] text-xl">{property.price}</p>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>{property.propertyType} • {property.bedrooms} beds • {property.bathrooms} baths • {property.sqft} sqft</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 mb-2">{property.description}</p>
                          <div className="text-xs text-gray-500">
                            <p>Contact: {property.contactName}</p>
                            <p>Email: {property.contactEmail}</p>
                            <p>Phone: {property.contactPhone}</p>
                            <p>Submitted: {property.createdAt}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleApproveProperty(property.id)}
                          className="bg-[#006d4e] hover:bg-[#005a3f]"
                          size="sm"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRejectProperty(property.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleDeleteProperty(property.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {pendingProperties.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No pending properties</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Approved Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#006d4e] flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Approved Properties ({approvedProperties.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{property.title}</h3>
                          <p className="text-gray-600">{property.location}</p>
                          <p className="font-bold text-[#006d4e]">{property.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteProperty(property.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#006d4e]">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#006d4e]">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Site Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Name</label>
                      <Input defaultValue="Real Estate Crafters" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Email</label>
                      <Input defaultValue="info@realestatecrafters.com" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Site Description</h3>
                  <Textarea 
                    defaultValue="Your trusted partner in real estate solutions"
                    rows={3}
                  />
                </div>
                <Button className="bg-[#006d4e] hover:bg-[#005a3f]">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
