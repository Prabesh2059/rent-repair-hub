import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  type: 'buy' | 'rent';
  image: string;
}

interface PendingProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');
  
  const [contacts, setContacts] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Property Inquiry",
      message: "I'm interested in the downtown apartment listing.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Selling Property",
      message: "I want to list my house for sale.",
      date: "2024-01-14"
    }
  ]);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Modern Family Home",
      location: "Downtown, City Center",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: "2,100 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Uptown District",
      price: "$2,500/month",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    }
  ]);

  const [pendingProperties, setPendingProperties] = useState<PendingProperty[]>([
    {
      id: 1,
      title: "Beautiful Family Home",
      location: "123 Main Street, Springfield",
      price: "450000",
      description: "This stunning family home features modern amenities and a great location.",
      propertyType: "house",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "2400",
      contactName: "Alice Johnson",
      contactEmail: "alice@example.com",
      contactPhone: "(555) 123-4567",
      submissionDate: "2024-01-16",
      status: 'pending'
    },
    {
      id: 2,
      title: "Cozy Downtown Apartment",
      location: "456 Oak Avenue, Downtown",
      price: "1800",
      description: "Perfect apartment for young professionals in the heart of the city.",
      propertyType: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "800",
      contactName: "Bob Wilson",
      contactEmail: "bob@example.com",
      contactPhone: "(555) 987-6543",
      submissionDate: "2024-01-15",
      status: 'pending'
    }
  ]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    beds: 1,
    baths: 1,
    sqft: "",
    type: 'buy' as 'buy' | 'rent',
    image: ""
  });

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingPendingProperty, setEditingPendingProperty] = useState<PendingProperty | null>(null);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [showPendingPropertyDialog, setShowPendingPropertyDialog] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: "Contact message has been removed.",
    });
  };

  const handleAddProperty = () => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...newProperty, id: editingProperty.id } : p));
      toast({ title: "Property Updated", description: "Property has been updated successfully." });
    } else {
      const newId = Math.max(...properties.map(p => p.id)) + 1;
      setProperties([...properties, { ...newProperty, id: newId }]);
      toast({ title: "Property Added", description: "New property has been added successfully." });
    }
    
    setNewProperty({ title: "", location: "", price: "", beds: 1, baths: 1, sqft: "", type: 'buy', image: "" });
    setEditingProperty(null);
    setShowPropertyDialog(false);
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty(property);
    setEditingProperty(property);
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been removed.",
    });
  };

  const handleApprovePendingProperty = (pendingProperty: PendingProperty) => {
    // Convert pending property to approved property
    const newProperty: Property = {
      id: Math.max(...properties.map(p => p.id), 0) + 1,
      title: pendingProperty.title,
      location: pendingProperty.location,
      price: pendingProperty.propertyType === 'apartment' ? `$${pendingProperty.price}/month` : `$${pendingProperty.price}`,
      beds: pendingProperty.bedrooms,
      baths: pendingProperty.bathrooms,
      sqft: `${pendingProperty.sqft} sq ft`,
      type: pendingProperty.propertyType === 'apartment' ? 'rent' : 'buy',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    };

    setProperties([...properties, newProperty]);
    setPendingProperties(pendingProperties.filter(p => p.id !== pendingProperty.id));
    
    toast({
      title: "Property Approved",
      description: "Property has been approved and added to listings.",
    });
  };

  const handleRejectPendingProperty = (id: number) => {
    setPendingProperties(pendingProperties.filter(p => p.id !== id));
    toast({
      title: "Property Rejected",
      description: "Property submission has been rejected.",
    });
  };

  const handleEditPendingProperty = (property: PendingProperty) => {
    setEditingPendingProperty(property);
    setShowPendingPropertyDialog(true);
  };

  const handleUpdatePendingProperty = () => {
    if (editingPendingProperty) {
      setPendingProperties(pendingProperties.map(p => 
        p.id === editingPendingProperty.id ? editingPendingProperty : p
      ));
      toast({
        title: "Property Updated",
        description: "Pending property has been updated.",
      });
    }
    setEditingPendingProperty(null);
    setShowPendingPropertyDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your real estate platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            className="flex items-center text-xs sm:text-sm"
          >
            <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Contact Messages</span>
            <span className="sm:hidden">Contacts</span>
          </Button>
          <Button
            variant={activeTab === 'properties' ? 'default' : 'outline'}
            onClick={() => setActiveTab('properties')}
            className="flex items-center text-xs sm:text-sm"
          >
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Properties</span>
            <span className="sm:hidden">Props</span>
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
            className="flex items-center text-xs sm:text-sm"
          >
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Pending Properties</span>
            <span className="sm:hidden">Pending</span>
          </Button>
        </div>

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Message</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{contact.email}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">{contact.message}</TableCell>
                      <TableCell className="hidden sm:table-cell">{contact.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Properties Management</h2>
              <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingProperty(null); setNewProperty({ title: "", location: "", price: "", beds: 1, baths: 1, sqft: "", type: 'buy', image: "" }); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Property</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                        placeholder="Property title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newProperty.location}
                        onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                        placeholder="Property location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                        placeholder="$450,000 or $2,500/month"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="beds">Bedrooms</Label>
                        <Input
                          id="beds"
                          type="number"
                          value={newProperty.beds}
                          onChange={(e) => setNewProperty({ ...newProperty, beds: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="baths">Bathrooms</Label>
                        <Input
                          id="baths"
                          type="number"
                          value={newProperty.baths}
                          onChange={(e) => setNewProperty({ ...newProperty, baths: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input
                        id="sqft"
                        value={newProperty.sqft}
                        onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })}
                        placeholder="2,100 sq ft"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={newProperty.type} onValueChange={(value: 'buy' | 'rent') => setNewProperty({ ...newProperty, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProperty.image}
                        onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <Button onClick={handleAddProperty} className="w-full">
                      {editingProperty ? 'Update Property' : 'Add Property'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Beds/Baths</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">{property.price}</TableCell>
                        <TableCell className="hidden sm:table-cell">{property.beds}bed / {property.baths}bath</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {property.type === 'buy' ? 'For Sale' : 'For Rent'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pending Properties Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Pending Property Submissions</h2>
            </div>

            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Contact</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">
                          ${property.price}{property.propertyType === 'apartment' ? '/month' : ''}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{property.contactName}</TableCell>
                        <TableCell className="hidden lg:table-cell">{property.submissionDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprovePendingProperty(property)}
                              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            >
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPendingProperty(property)}
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRejectPendingProperty(property.id)}
                            >
                              <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Pending Property Dialog */}
            <Dialog open={showPendingPropertyDialog} onOpenChange={setShowPendingPropertyDialog}>
              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Pending Property</DialogTitle>
                </DialogHeader>
                {editingPendingProperty && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                          id="edit-title"
                          value={editingPendingProperty.title}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                          id="edit-location"
                          value={editingPendingProperty.location}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-price">Price</Label>
                        <Input
                          id="edit-price"
                          value={editingPendingProperty.price}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-type">Property Type</Label>
                        <Select 
                          value={editingPendingProperty.propertyType} 
                          onValueChange={(value) => setEditingPendingProperty({ ...editingPendingProperty, propertyType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                        <Input
                          id="edit-bedrooms"
                          type="number"
                          value={editingPendingProperty.bedrooms}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, bedrooms: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-bathrooms">Bathrooms</Label>
                        <Input
                          id="edit-bathrooms"
                          type="number"
                          step="0.5"
                          value={editingPendingProperty.bathrooms}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, bathrooms: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-sqft">Square Feet</Label>
                        <Input
                          id="edit-sqft"
                          value={editingPendingProperty.sqft}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, sqft: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editingPendingProperty.description}
                        onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-contact-name">Contact Name</Label>
                        <Input
                          id="edit-contact-name"
                          value={editingPendingProperty.contactName}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, contactName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-contact-email">Contact Email</Label>
                        <Input
                          id="edit-contact-email"
                          type="email"
                          value={editingPendingProperty.contactEmail}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, contactEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-contact-phone">Contact Phone</Label>
                        <Input
                          id="edit-contact-phone"
                          value={editingPendingProperty.contactPhone}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button onClick={handleUpdatePendingProperty} className="flex-1">
                        Update Property
                      </Button>
                      <Button
                        onClick={() => handleApprovePendingProperty(editingPendingProperty)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Update & Approve
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
