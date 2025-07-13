
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Check, X } from "lucide-react";

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Modern Villa in Downtown",
    type: "sale",
    price: 850000,
    location: "Downtown",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    status: "active",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Cozy Apartment for Rent",
    type: "rent",
    price: 2500,
    location: "Midtown",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: "active",
    image: "/placeholder.svg",
  }
];

// Mock data for pending properties
const mockPendingProperties = [
  {
    id: 3,
    title: "Luxury Penthouse",
    type: "sale",
    price: 1200000,
    location: "Uptown",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "pending",
    image: "/placeholder.svg",
    submittedAt: "2024-01-15",
  }
];

const Admin = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [pendingProperties, setPendingProperties] = useState(mockPendingProperties);
  const [newProperty, setNewProperty] = useState({
    title: "",
    type: "sale",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    image: "",
  });

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.price || !newProperty.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const property = {
      id: Date.now(),
      ...newProperty,
      price: parseInt(newProperty.price),
      bedrooms: parseInt(newProperty.bedrooms) || 0,
      bathrooms: parseInt(newProperty.bathrooms) || 0,
      area: parseInt(newProperty.area) || 0,
      status: "active",
      image: newProperty.image || "/placeholder.svg",
    };

    setProperties([...properties, property]);
    setNewProperty({
      title: "",
      type: "sale",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
      image: "",
    });
    toast.success("Property added successfully!");
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
    toast.success("Property deleted successfully!");
  };

  const handleApproveProperty = (id: number) => {
    const property = pendingProperties.find(p => p.id === id);
    if (property) {
      setProperties([...properties, { ...property, status: "active" }]);
      setPendingProperties(pendingProperties.filter(p => p.id !== id));
      toast.success("Property approved and published!");
    }
  };

  const handleRejectProperty = (id: number) => {
    setPendingProperties(pendingProperties.filter(p => p.id !== id));
    toast.success("Property rejected!");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#006d4e' }}>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-green-100">Manage your real estate properties</p>
        </div>

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="properties" className="data-[state=active]:bg-white data-[state=active]:text-[#006d4e]">
              Properties
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:text-[#006d4e]">
              Pending ({pendingProperties.length})
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-white data-[state=active]:text-[#006d4e]">
              Add Property
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#006d4e]">Published Properties</CardTitle>
                <CardDescription>Manage your active property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>
                          <Badge variant={property.type === "sale" ? "default" : "secondary"}>
                            {property.type}
                          </Badge>
                        </TableCell>
                        <TableCell>${property.price.toLocaleString()}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>
                          <Badge style={{ backgroundColor: '#006d4e', color: 'white' }}>
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#006d4e]">Pending Properties</CardTitle>
                <CardDescription>Review and approve property submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>
                          <Badge variant={property.type === "sale" ? "default" : "secondary"}>
                            {property.type}
                          </Badge>
                        </TableCell>
                        <TableCell>${property.price.toLocaleString()}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell>{property.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleApproveProperty(property.id)}
                              style={{ backgroundColor: '#006d4e', color: 'white' }}
                              className="hover:bg-[#005a40]"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRejectProperty(property.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingProperties.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No pending properties to review
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#006d4e]">Add New Property</CardTitle>
                <CardDescription>Create a new property listing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                      placeholder="Property title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newProperty.type} onValueChange={(value) => setNewProperty({...newProperty, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                      placeholder="Price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                      placeholder="Property location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                      placeholder="Number of bedrooms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                      placeholder="Number of bathrooms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={newProperty.area}
                      onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                      placeholder="Property area"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newProperty.image}
                    onChange={(e) => setNewProperty({...newProperty, image: e.target.value})}
                    placeholder="Property image URL"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                    placeholder="Property description"
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleAddProperty}
                  style={{ backgroundColor: '#006d4e', color: 'white' }}
                  className="hover:bg-[#005a40]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
