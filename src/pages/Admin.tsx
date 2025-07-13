
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Trash2, CheckCircle, XCircle, Eye, Users, Home, DollarSign, TrendingUp } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  description?: string;
  images?: string[];
  contactInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

const Admin = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    pendingProperties: 0,
    approvedProperties: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load properties from localStorage
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      const parsedProperties = JSON.parse(savedProperties);
      // Set all new properties as pending by default
      const propertiesWithStatus = parsedProperties.map((prop: any) => ({
        ...prop,
        status: prop.status || 'pending'
      }));
      setProperties(propertiesWithStatus);
    }

    // Calculate stats
    const totalProperties = properties.length;
    const pendingProperties = properties.filter(p => p.status === 'pending').length;
    const approvedProperties = properties.filter(p => p.status === 'approved').length;
    
    setStats({
      totalUsers: 0,
      totalProperties,
      pendingProperties,
      approvedProperties
    });
  }, [properties.length]);

  const handleApproveProperty = (propertyId: string) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, status: 'approved' as const }
          : prop
      )
    );
    
    // Update localStorage
    const updatedProperties = properties.map(prop => 
      prop.id === propertyId 
        ? { ...prop, status: 'approved' as const }
        : prop
    );
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    toast({
      title: "Property Approved",
      description: "The property has been successfully approved.",
    });
  };

  const handleRejectProperty = (propertyId: string) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, status: 'rejected' as const }
          : prop
      )
    );
    
    // Update localStorage
    const updatedProperties = properties.map(prop => 
      prop.id === propertyId 
        ? { ...prop, status: 'rejected' as const }
        : prop
    );
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    toast({
      title: "Property Rejected",
      description: "The property has been rejected.",
      variant: "destructive",
    });
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties(prev => prev.filter(prop => prop.id !== propertyId));
    
    // Update localStorage
    const updatedProperties = properties.filter(prop => prop.id !== propertyId);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    toast({
      title: "Property Deleted",
      description: "The property has been permanently deleted.",
      variant: "destructive",
    });
  };

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const approvedProperties = properties.filter(p => p.status === 'approved');
  const rejectedProperties = properties.filter(p => p.status === 'rejected');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" style={{ backgroundColor: '#fbbf24', color: 'white' }}>Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" style={{ backgroundColor: '#006d4e', color: 'white' }}>Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#006d4e' }}>Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage properties and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Properties</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingProperties}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Properties</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedProperties}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" style={{ color: '#006d4e' }}>
              Pending Properties ({pendingProperties.length})
            </TabsTrigger>
            <TabsTrigger value="approved" style={{ color: '#006d4e' }}>
              Approved Properties ({approvedProperties.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" style={{ color: '#006d4e' }}>
              Rejected Properties ({rejectedProperties.length})
            </TabsTrigger>
            <TabsTrigger value="users" style={{ color: '#006d4e' }}>
              Users ({users.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#006d4e' }}>Pending Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingProperties.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending properties</p>
                ) : (
                  <div className="space-y-4">
                    {pendingProperties.map((property) => (
                      <div key={property.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{property.title}</h3>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="font-bold text-lg" style={{ color: '#006d4e' }}>{property.price}</p>
                            <div className="flex gap-2 mt-2">
                              {getStatusBadge(property.status)}
                              <Badge variant="outline">{property.type}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        {property.description && (
                          <p className="text-gray-700 text-sm">{property.description}</p>
                        )}
                        
                        {property.contactInfo && (
                          <div className="bg-gray-50 p-3 rounded">
                            <h4 className="font-medium mb-2">Contact Information:</h4>
                            <p className="text-sm">Name: {property.contactInfo.name}</p>
                            <p className="text-sm">Phone: {property.contactInfo.phone}</p>
                            <p className="text-sm">Email: {property.contactInfo.email}</p>
                          </div>
                        )}
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleApproveProperty(property.id)}
                            className="flex items-center gap-2"
                            style={{ backgroundColor: '#006d4e', color: 'white' }}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleRejectProperty(property.id)}
                            variant="destructive"
                            className="flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                          <Button
                            onClick={() => handleDeleteProperty(property.id)}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#006d4e' }}>Approved Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {approvedProperties.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No approved properties</p>
                ) : (
                  <div className="space-y-4">
                    {approvedProperties.map((property) => (
                      <div key={property.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{property.title}</h3>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="font-bold text-lg" style={{ color: '#006d4e' }}>{property.price}</p>
                            <div className="flex gap-2 mt-2">
                              {getStatusBadge(property.status)}
                              <Badge variant="outline">{property.type}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleDeleteProperty(property.id)}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#006d4e' }}>Rejected Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {rejectedProperties.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No rejected properties</p>
                ) : (
                  <div className="space-y-4">
                    {rejectedProperties.map((property) => (
                      <div key={property.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{property.title}</h3>
                            <p className="text-gray-600">{property.location}</p>
                            <p className="font-bold text-lg" style={{ color: '#006d4e' }}>{property.price}</p>
                            <div className="flex gap-2 mt-2">
                              {getStatusBadge(property.status)}
                              <Badge variant="outline">{property.type}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleDeleteProperty(property.id)}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#006d4e' }}>Users Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">User management features coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
