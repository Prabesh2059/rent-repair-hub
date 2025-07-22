import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut, CheckCircle, Clock, Phone, Eye, Trophy, BookOpen, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import * as LucideIcons from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead?: boolean;
}

interface ServiceRequest {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  projectType: string;
  propertyType: string;
  budget: string;
  timeline: string;
  description: string;
  location: string;
  images: string[];
  submissionDate: string;
  isRead?: boolean;
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
  phone: string;
  status: 'active' | 'inactive';
  features: string[]; // New field
  description: string; // Added description field
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
  image: string;
}

interface Project {
  id: number;
  title: string;
  location: string;
  completedDate: string;
  startDate: string; // New field
  projectType: string;
  client: string;
  size: string;
  duration: string;
  professionals: string; // New field
  budget: string; // New field
  status: 'planning' | 'under construction' | 'completed' | 'on hold' | 'cancelled';
  image: string; // Keep single image for display in table
  keyFeatures: string[];
  challenges: string[];
  outcomes: string[];
  projectImages: string[]; // New field for multiple images
  description: string; // Added description field
}


const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  
  const [contacts, setContacts] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Property Inquiry",
      message: "I'm interested in the downtown apartment listing.",
      date: "2024-01-15",
      isRead: false
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Selling Property",
      message: "I want to list my house for sale.",
      date: "2024-01-14",
      isRead: true
    }
  ]);

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 1,
      clientName: "Michael Johnson",
      email: "michael@example.com",
      phone: "(555) 123-4567",
      serviceType: "renovation",
      projectType: "Kitchen Renovation",
      propertyType: "house",
      budget: "15000-25000",
      timeline: "2-3 months",
      description: "Looking to completely renovate the kitchen with modern appliances and cabinets.",
      location: "Downtown, City Center",
      images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136", "https://images.unsplash.com/photo-1556909002-f90a3c292e3e"],
      submissionDate: "2024-01-16",
      isRead: false
    },
    {
      id: 2,
      clientName: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "(555) 987-6543",
      serviceType: "repair",
      projectType: "Bathroom Repair",
      propertyType: "apartment",
      budget: "5000-10000",
      timeline: "1 month",
      description: "Need to fix plumbing issues and replace tiles in the bathroom.",
      location: "Uptown District",
      images: ["https://images.unsplash.com/photo-1620626011761-996317b8d101"],
      submissionDate: "2024-01-15",
      isRead: true
    }
  ]);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Beautiful Family Home",
      location: "123 Oak Street, Downtown",
      price: "$450,000",
      beds: 4,
      baths: 3,
      sqft: "2,400 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      phone: "(555) 123-4567",
      status: 'active',
      features: [] as string[], // New field
      description: "" // Added description field
    },
    {
      id: 2,
      title: "Modern Luxury Condo",
      location: "456 Pine Avenue, Uptown",
      price: "$680,000",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      phone: "(555) 234-5678",
      status: 'active',
      features: [] as string[], // New field
      description: "" // Added description field
    },
    {
      id: 3,
      title: "Downtown Luxury Apartment",
      location: "789 Main Street, City Center",
      price: "$2,500/month",
      beds: 2,
      baths: 2,
      sqft: "1,200 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      phone: "(555) 345-6789",
      status: 'active',
      features: [] as string[], // New field
      description: "" // Added description field
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      location: "321 Elm Street, Midtown",
      price: "$1,800/month",
      beds: 1,
      baths: 1,
      sqft: "800 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      phone: "(555) 456-7890",
      status: 'active',
      features: [] as string[], // New field
      description: "" // Added description field
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
      status: 'pending',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
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
      status: 'pending',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Skyline Business Complex",
      location: "Downtown Financial District",
      completedDate: "March 2024",
      startDate: "January 2024", // New field
      projectType: "commercial",
      client: "Metro Corporation",
      size: "250,000 sq ft",
      duration: "24 months",
      professionals: "15", // New field
      budget: "$500,000", // New field
      status: "completed",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      keyFeatures: ["Modern design", "Energy efficient", "Prime location"],
      challenges: ["Tight deadline", "Material sourcing"],
      outcomes: ["Delivered on time", "High client satisfaction"],
      projectImages: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        "https://images.unsplash.com/photo-1582234007127-14e3006a8e84",
        "https://images.unsplash.com/photo-1600877983636-f00e99e82c5f"
      ],
      description: "" // Added description field
    },
    {
      id: 2,
      title: "Green Valley Residential",
      location: "Suburb Hills, North Side",
      completedDate: "January 2024",
      startDate: "November 2023", // New field
      projectType: "residential",
      client: "Valley Homes Ltd",
      size: "150 units",
      duration: "18 months",
      professionals: "10", // New field
      budget: "$300,000", // New field
      status: "completed",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      keyFeatures: ["Sustainable materials", "Community amenities", "Spacious layouts"],
      challenges: ["Weather delays", "Permitting issues"],
      outcomes: ["Eco-friendly certification", "Strong sales"],
      projectImages: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
        "https://images.unsplash.com/photo-1564078564-e1d9d7e5d8a0",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
      ],
      description: "" // Added description field
    },
    {
      id: 3,
      title: "Modern Office Tower",
      location: "Central Business District",
      completedDate: "November 2023",
      startDate: "October 2023", // New field
      projectType: "commercial",
      client: "Tech Solutions Inc",
      size: "180,000 sq ft",
      duration: "30 months",
      professionals: "12", // New field
      budget: "$400,000", // New field
      status: "completed",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      keyFeatures: ["Smart building technology", "Flexible workspaces", "Rooftop garden"],
      challenges: ["Complex foundation work", "Integration of new tech"],
      outcomes: ["Award-winning design", "Increased tenant occupancy"],
      projectImages: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c",
        "https://images.unsplash.com/photo-1506748687-bb4f5766b3f9",
        "https://images.unsplash.com/photo-1524148417534-111ad7a25039"
      ],
      description: "" // Added description field
    }
  ]);


  const initialNewPropertyState = {
    title: "",
    location: "",
    price: "",
    beds: 1,
    baths: 1,
    sqft: "",
    type: 'buy' as 'buy' | 'rent',
    image: "",
    phone: "",
    status: 'active' as 'active' | 'inactive',
    features: [] as string[], // New field
    description: "" // Added description field
  };
  const [newProperty, setNewProperty] = useState<typeof initialNewPropertyState>(initialNewPropertyState);
  const [propertyImagePreview, setPropertyImagePreview] = useState<string | null>(null);

  const initialNewPendingPropertyState = {
    title: "",
    location: "",
    price: "",
    description: "",
    propertyType: "house",
    bedrooms: 1,
    bathrooms: 1,
    sqft: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    image: ""
  };
  const [newPendingProperty, setNewPendingProperty] = useState<Omit<PendingProperty, 'id' | 'status' | 'submissionDate'>>(initialNewPendingPropertyState);
  const [pendingPropertyImagePreview, setPendingPropertyImagePreview] = useState<string | null>(null);

  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'image'> & { description?: string }>({
    title: "",
    location: "",
    completedDate: "",
    startDate: "",
    projectType: "",
    client: "",
    size: "",
    duration: "",
    professionals: "",
    budget: "",
    keyFeatures: [],
    challenges: [],
    outcomes: [],
    projectImages: [],
    description: "",
    status: "planning" // Default to planning
  });

  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [showProjectPreviewDialog, setShowProjectPreviewDialog] = useState(false);

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingPendingProperty, setEditingPendingProperty] = useState<PendingProperty | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [showPendingPropertyDialog, setShowPendingPropertyDialog] = useState(false);
  // Removed showAddPendingPropertyDialog as it's being merged
  const [showProjectDialog, setShowProjectDialog] = useState(false);

  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewPropertyDialog, setShowViewPropertyDialog] = useState(false);
  const [showViewPendingDialog, setShowViewPendingDialog] = useState(false);
  const [showViewProjectDialog, setShowViewProjectDialog] = useState(false);
  const [showViewServiceRequestDialog, setShowViewServiceRequestDialog] = useState(false);

  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [viewingPendingProperty, setViewingPendingProperty] = useState<PendingProperty | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [viewingServiceRequest, setViewingServiceRequest] = useState<ServiceRequest | null>(null);

  const availableIcons = [
    'Home', 'Calculator', 'Hammer', 'PaintBucket', 'Shield', 
    'Key', 'MapPin', 'Phone', 'Mail', 'Users', 'Building', 'Cog', 'Star', 
    'Heart', 'CheckCircle', 'Award', 'Target', 'Zap', 'Lightbulb', 'Camera',
    'FileText', 'Clock', 'Calendar', 'TrendingUp', 'DollarSign', 'CreditCard'
  ] as (keyof typeof LucideIcons)[];

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

  const handleMarkContactAsRead = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, isRead: true } : contact
    ));
    toast({
      title: "Message Marked as Read",
      description: "Contact message has been marked as read.",
    });
  };

  const handleDeleteServiceRequest = (id: number) => {
    setServiceRequests(serviceRequests.filter(request => request.id !== id));
    toast({
      title: "Service Request Deleted",
      description: "Service request has been removed.",
    });
  };

  const handleMarkServiceRequestAsRead = (id: number) => {
    setServiceRequests(serviceRequests.map(request => 
      request.id === id ? { ...request, isRead: true } : request
    ));
    toast({
      title: "Service Request Marked as Read",
      description: "Service request has been marked as read.",
    });
  };

  const handlePropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPropertyImagePreview(reader.result);
          setNewProperty({ ...newProperty, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPropertyImagePreview("");
      setNewProperty({ ...newProperty, image: "" });
    }
  };

  const handlePendingPropertyImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPendingPropertyImagePreview(reader.result);
          setNewPendingProperty({ ...newPendingProperty, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPendingPropertyImagePreview("");
      setNewPendingProperty({ ...newPendingProperty, image: "" });
    }
  };

  const handleUpdateProperty = () => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...newProperty, id: editingProperty.id } : p));
      toast({ title: "Property Updated", description: "Property has been updated successfully." });
    } else {
      // Logic for adding a new property if this dialog is used for adding
      const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
      setProperties([...properties, { ...newProperty, id: newId }]);
      toast({ title: "Property Added", description: "New property has been added successfully." });
    }
    setEditingProperty(null);
    setShowPropertyDialog(false);
    setPropertyImagePreview(null); // Clear preview after update/add
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty(property);
    setEditingProperty(property);
    setPropertyImagePreview(property.image); // Set preview for existing image
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been removed.",
    });
  };

  const handleTogglePropertyStatus = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
    toast({
      title: "Status Updated",
      description: "Property status has been changed.",
    });
  };

  const handleApprovePendingProperty = (pendingProperty: PendingProperty) => {
    const newProperty: Property = {
      id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1,
      title: pendingProperty.title,
      location: pendingProperty.location,
      price: pendingProperty.propertyType === 'apartment' ? `$${pendingProperty.price}/month` : `$${pendingProperty.price}`,
      beds: pendingProperty.bedrooms,
      baths: pendingProperty.bathrooms,
      sqft: `${pendingProperty.sqft} sq ft`,
      type: pendingProperty.propertyType === 'apartment' ? 'rent' : 'buy',
      image: pendingProperty.image,
      phone: pendingProperty.contactPhone,
      status: 'active',
      features: [] as string[], // New field
      description: "" // Ensure description is present
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
    setNewPendingProperty({ 
      title: property.title,
      location: property.location,
      price: property.price,
      description: property.description,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sqft: property.sqft,
      contactName: property.contactName,
      contactEmail: property.contactEmail,
      contactPhone: property.contactPhone,
      image: property.image
    });
    setPendingPropertyImagePreview(property.image);
    setShowPendingPropertyDialog(true);
  };

  const handleAddPendingProperty = () => {
    const newId = pendingProperties.length > 0 ? Math.max(...pendingProperties.map(p => p.id)) + 1 : 1;
    const currentDate = new Date().toISOString().split('T')[0];
    setPendingProperties([...pendingProperties, { 
        ...newPendingProperty, 
        id: newId, 
        status: 'pending', 
        submissionDate: currentDate 
    }]);
    toast({ title: "Pending Property Added", description: "New pending property has been added for review." });
    setNewPendingProperty(initialNewPendingPropertyState);
    setPendingPropertyImagePreview(null);
    // Removed setShowAddPendingPropertyDialog(false) as it's being merged
  };

  const handleUpdatePendingProperty = () => {
    if (editingPendingProperty) {
      setPendingProperties(pendingProperties.map(p => 
        p.id === editingPendingProperty.id ? { 
          ...p,
          title: newPendingProperty.title,
          location: newPendingProperty.location,
          price: newPendingProperty.price,
          description: newPendingProperty.description,
          propertyType: newPendingProperty.propertyType,
          bedrooms: newPendingProperty.bedrooms,
          bathrooms: newPendingProperty.bathrooms,
          sqft: newPendingProperty.sqft,
          contactName: newPendingProperty.contactName,
          contactEmail: newPendingProperty.contactEmail,
          contactPhone: newPendingProperty.contactPhone,
          image: newPendingProperty.image
        } : p
      ));
      toast({
        title: "Property Updated",
        description: "Pending property has been updated.",
      });
    }
    setEditingPendingProperty(null);
    setShowPendingPropertyDialog(false);
    setPendingPropertyImagePreview(null);
  };

  const handleCallProperty = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleViewContact = (contact: ContactMessage) => {
    setViewingContact(contact);
    setShowContactDialog(true);
  };

  const handleViewProperty = (property: Property) => {
    setViewingProperty(property);
    setShowViewPropertyDialog(true);
  };

  const handleViewPendingProperty = (property: PendingProperty) => {
    setViewingPendingProperty(property);
    setShowViewPendingDialog(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageUrls: string[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          imageUrls.push(reader.result);
          if (imageUrls.length === files.length) {
            setProjectImages(prev => [...prev, ...imageUrls]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProjectImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateProjectForm = () => {
    if (newProject.title.trim() === "" || newProject.location.trim() === "" || newProject.completedDate.trim() === "" ||
        newProject.projectType.trim() === "" || newProject.client.trim() === "" || newProject.size.trim() === "" ||
        newProject.duration.trim() === "") {
      toast({
        title: "Missing Information",
        description: "Please fill in all general project details.",
        variant: "destructive",
      });
      return false;
    }
    if (newProject.keyFeatures.filter(f => f.trim() !== '').length === 0 || 
        newProject.challenges.filter(c => c.trim() !== '').length === 0 || 
        newProject.outcomes.filter(o => o.trim() !== '').length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one key feature, challenge, and outcome.",
        variant: "destructive",
      });
      return false;
    }
    if (projectImages.length < 3) {
      toast({
        title: "Missing Images",
        description: "Please upload at least 3 project images.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleAddOrUpdateProject = () => {
    if (!validateProjectForm()) {
      return;
    }

    const finalNewProject: Project = {
      ...newProject,
      id: editingProject ? editingProject.id : (projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1),
      status: newProject.status as any, // Use selected status
      image: projectImages[0] || "",
      projectImages: projectImages,
      keyFeatures: newProject.keyFeatures.filter(f => f.trim() !== ''),
      challenges: newProject.challenges.filter(c => c.trim() !== ''),
      outcomes: newProject.outcomes.filter(o => o.trim() !== ''),
      description: newProject.description || ""
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === finalNewProject.id ? finalNewProject : p));
      toast({ title: "Project Updated", description: "Project has been updated successfully." });
    } else {
      setProjects([...projects, finalNewProject]);
      toast({ title: "Project Added", description: "New project has been added successfully." });
    }
    
    setNewProject({ 
      title: "", 
      location: "", 
      completedDate: "", 
      startDate: "", 
      projectType: "", 
      client: "", 
      size: "", 
      duration: "", 
      professionals: "", 
      budget: "", 
      keyFeatures: [], 
      challenges: [], 
      outcomes: [], 
      projectImages: [],
      description: "",
      status: "planning"
    });
    setProjectImages([]);
    setEditingProject(null);
    setShowProjectDialog(false);
    setShowProjectPreviewDialog(false);
  };

  const handlePreviewProject = () => {
    if (!validateProjectForm()) {
      return;
    }
    setShowProjectDialog(false);
    setShowProjectPreviewDialog(true);
  };

  const handleEditProject = (project: Project) => {
    setNewProject({
      title: project.title,
      location: project.location,
      completedDate: project.completedDate,
      startDate: project.startDate,
      projectType: project.projectType,
      client: project.client,
      size: project.size,
      duration: project.duration,
      professionals: project.professionals,
      budget: project.budget,
      keyFeatures: project.keyFeatures,
      challenges: project.challenges,
      outcomes: project.outcomes,
      projectImages: project.projectImages,
      description: project.description || "",
      status: project.status || "planning"
    });
    setProjectImages(project.projectImages);
    setEditingProject(project);
    setShowProjectDialog(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been removed.",
    });
  };

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
    setShowViewProjectDialog(true);
  };

  const handleViewServiceRequest = (request: ServiceRequest) => {
    setViewingServiceRequest(request);
    setShowViewServiceRequestDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            variant={activeTab === 'listings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('listings')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'listings' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Properties</span>
            <span className="sm:hidden">Listings</span>
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'pending' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Sales request</span>
            <span className="sm:hidden">Pending</span>
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('projects')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'projects' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <Trophy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Projects</span>
            <span className="sm:hidden">Projects</span>
          </Button>
          
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'contacts' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Contact Messages</span>
            <span className="sm:hidden">Contacts</span>
          </Button>
          <Button
            variant={activeTab === 'service-requests' ? 'default' : 'outline'}
            onClick={() => setActiveTab('service-requests')}
            className={`flex items-center text-xs sm:text-sm ${activeTab === 'service-requests' ? 'bg-[#006d4e] text-white hover:bg-[#006d4e]/90' : ''}`}
          >
            <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Service Requests</span>
            <span className="sm:hidden">Requests</span>
          </Button>
        </div>

        {/* All Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">All Property Listings</h2>
              <div className="flex flex-col sm:flex-row gap-4"> {/* Added a div to contain both buttons */}
                <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
                  <Button onClick={() => { setNewProperty(initialNewPropertyState); setEditingProperty(null); setPropertyImagePreview(null); setShowPropertyDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90" >
                      <Plus className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Add Property</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
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
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input
                        id="phone"
                        value={newProperty.phone}
                        onChange={(e) => setNewProperty({ ...newProperty, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newProperty.type}
                        onValueChange={(value: 'buy' | 'rent') => setNewProperty({ ...newProperty, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Features section in Add/Edit Property dialog */}
                    <div>
                      <Label>Features</Label>
                      {newProperty.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const updatedFeatures = [...newProperty.features];
                              updatedFeatures[index] = e.target.value;
                              setNewProperty({ ...newProperty, features: updatedFeatures });
                            }}
                            placeholder="e.g., Swimming Pool"
                          />
                          <Button variant="destructive" size="sm" onClick={() => {
                            setNewProperty({ ...newProperty, features: newProperty.features.filter((_, i) => i !== index) });
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                      </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => setNewProperty({ ...newProperty, features: [...newProperty.features, ""] })}>
                        <Plus className="mr-2 h-4 w-4" /> Add Feature
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor="image">Property Image</Label>
                      <Input id="image" type="file" accept="image/*" onChange={handlePropertyImageUpload} className="mb-2" />
                      {propertyImagePreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                          <img src={propertyImagePreview} alt="Property Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProperty.description}
                        onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                        placeholder="Describe the property in detail"
                        className="min-h-[80px]"
                      />
                    </div>
                    <Button onClick={handleUpdateProperty} className="w-full bg-[#006d4e] text-white hover:bg-[#006d4e]/90" >
                      {editingProperty ? 'Update Property' : 'Add Property'}
                    </Button>
                  </div>
                </DialogContent>
                </Dialog>
              </div> {/* End of button container */}
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
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell>{property.price}</TableCell>
                        <TableCell className="hidden sm:table-cell">{property.beds} / {property.baths}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {property.type}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {property.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewProperty(property)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleCallProperty(property.phone)}>
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleTogglePropertyStatus(property.id)} className={property.status === 'active' ? 'text-gray-600' : 'text-green-600'}>
                              {property.status === 'active' ? 'Deactivate' : 'Activate'}
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

        {/* View Property Dialog */}
        <Dialog open={showViewPropertyDialog} onOpenChange={setShowViewPropertyDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Property Details</DialogTitle>
            </DialogHeader>
            {viewingProperty && (
              <div className="space-y-4">
                <img src={viewingProperty.image} alt={viewingProperty.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingProperty.title}</h3>
                <p className="text-lg text-gray-700">{viewingProperty.price}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Type</Label>
                    <p className="text-gray-700">{viewingProperty.type}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingProperty.beds}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingProperty.baths}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingProperty.sqft}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingProperty.phone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        viewingProperty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {viewingProperty.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => { handleEditProperty(viewingProperty); setShowViewPropertyDialog(false); }} variant="outline">
                    <Edit className="mr-2 h-4 w-4" /> Edit Property
                  </Button>
                  <Button onClick={() => handleCallProperty(viewingProperty.phone)} variant="outline">
                    <Phone className="mr-2 h-4 w-4" /> Call
                  </Button>
                </div>
                {/* In Property Details dialog, display features if any */}
                {viewingProperty && viewingProperty.features && viewingProperty.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold mt-4">Features:</h4>
                    <ul className="list-disc pl-5">
                      {viewingProperty.features.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                  </div>
                )}
                {viewingProperty && viewingProperty.description && (
                  <div>
                    <Label className="font-semibold">Description</Label>
                    <p className="text-gray-700">{viewingProperty.description}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Pending Properties Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Pending Property Submissions</h2>
              {/* No "Add Property For Sale" button here anymore */}
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
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell>{property.price}</TableCell>
                        <TableCell className="hidden sm:table-cell">{property.bedrooms} / {property.bathrooms}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''
                            }`}
                          >
                            {property.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewPendingProperty(property)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditPendingProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button size="sm" className="bg-green-600 text-white hover:bg-green-600/90" onClick={() => handleApprovePendingProperty(property)}>
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleRejectPendingProperty(property.id)}>
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

        {/* View Pending Property Dialog */}
        <Dialog open={showViewPendingDialog} onOpenChange={setShowViewPendingDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pending Property Details</DialogTitle>
            </DialogHeader>
            {viewingPendingProperty && (
              <div className="space-y-4">
                <img src={viewingPendingProperty.image} alt={viewingPendingProperty.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingPendingProperty.title}</h3>
                <p className="text-lg text-gray-700">Price: {viewingPendingProperty.price}</p>
                <p className="text-gray-700">{viewingPendingProperty.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingPendingProperty.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700">{viewingPendingProperty.propertyType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bedrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bathrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingPendingProperty.sqft}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Name</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Email</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactEmail}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingPendingProperty.contactPhone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingPendingProperty.submissionDate}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        viewingPendingProperty.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''
                      }`}
                    >
                      {viewingPendingProperty.status}
                    </span>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => { handleApprovePendingProperty(viewingPendingProperty); setShowViewPendingDialog(false); }} className="bg-green-600 text-white hover:bg-green-600/90">
                    Approve
                  </Button>
                  <Button onClick={() => { handleRejectPendingProperty(viewingPendingProperty.id); setShowViewPendingDialog(false); }} variant="destructive">
                    Reject
                  </Button>
                  <Button onClick={() => { handleEditPendingProperty(viewingPendingProperty); setShowViewPendingDialog(false); }} variant="outline">
                    Edit
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Completed Projects</h2>
              <Button onClick={() => { setNewProject({ title: "", location: "", completedDate: "", startDate: "", projectType: "", client: "", size: "", duration: "", professionals: "", budget: "", keyFeatures: [], challenges: [], outcomes: [], projectImages: [], description: "", status: "planning" }); setProjectImages([]); setEditingProject(null); setShowProjectDialog(true); }} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead className="hidden lg:table-cell">Completed Date</TableHead>
                      <TableHead className="hidden lg:table-cell">Client</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{project.location}</TableCell>
                        <TableCell className="hidden lg:table-cell">{project.completedDate}</TableCell>
                        <TableCell className="hidden lg:table-cell">{project.client}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewProject(project)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
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

        {/* Add/Edit Project Dialog */}
        <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input id="projectTitle" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="e.g., Grand Commercial Complex" />
              </div>
              <div>
                <Label htmlFor="projectLocation">Location</Label>
                <Input id="projectLocation" value={newProject.location} onChange={(e) => setNewProject({ ...newProject, location: e.target.value })} placeholder="e.g., Downtown Financial District" />
              </div>
              <div>
                <Label htmlFor="startDate">Project Start Date</Label>
                <Input id="startDate" type="date" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} placeholder="e.g., 2023-01-01" />
              </div>
              <div>
                <Label htmlFor="completedDate">Completed Date</Label>
                <Input id="completedDate" value={newProject.completedDate} onChange={(e) => setNewProject({ ...newProject, completedDate: e.target.value })} placeholder="e.g., March 2024" />
              </div>
              <div>
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  value={newProject.projectType}
                  onValueChange={(value) => setNewProject({ ...newProject, projectType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="client">Client</Label>
                <Input id="client" value={newProject.client} onChange={(e) => setNewProject({ ...newProject, client: e.target.value })} placeholder="e.g., Metro Corporation" />
              </div>
              <div>
                <Label htmlFor="size">Size</Label>
                <Input id="size" value={newProject.size} onChange={(e) => setNewProject({ ...newProject, size: e.target.value })} placeholder="e.g., 250,000 sq ft" />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" value={newProject.duration} onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })} placeholder="e.g., 24 months" />
              </div>
              <div>
                <Label htmlFor="professionals">No of Professionals</Label>
                <Input id="professionals" type="number" value={newProject.professionals} onChange={(e) => setNewProject({ ...newProject, professionals: e.target.value })} placeholder="e.g., 15" />
              </div>
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" value={newProject.budget} onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })} placeholder="e.g., $500,000" />
              </div>

              {/* Key Features */}
              <div>
                <Label>Key Features</Label>
                {newProject.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const updatedFeatures = [...newProject.keyFeatures];
                        updatedFeatures[index] = e.target.value;
                        setNewProject({ ...newProject, keyFeatures: updatedFeatures });
                      }}
                      placeholder="e.g., Modern design"
                    />
                    <Button variant="destructive" size="sm" onClick={() => {
                      setNewProject({ ...newProject, keyFeatures: newProject.keyFeatures.filter((_, i) => i !== index) });
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setNewProject({ ...newProject, keyFeatures: [...newProject.keyFeatures, ""] })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Feature
                </Button>
              </div>

              {/* Challenges */}
              <div>
                <Label>Challenges</Label>
                {newProject.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={challenge}
                      onChange={(e) => {
                        const updatedChallenges = [...newProject.challenges];
                        updatedChallenges[index] = e.target.value;
                        setNewProject({ ...newProject, challenges: updatedChallenges });
                      }}
                      placeholder="e.g., Tight deadline"
                    />
                    <Button variant="destructive" size="sm" onClick={() => {
                      setNewProject({ ...newProject, challenges: newProject.challenges.filter((_, i) => i !== index) });
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setNewProject({ ...newProject, challenges: [...newProject.challenges, ""] })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Challenge
                </Button>
              </div>

              {/* Outcomes */}
              <div>
                <Label>Outcomes</Label>
                {newProject.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={outcome}
                      onChange={(e) => {
                        const updatedOutcomes = [...newProject.outcomes];
                        updatedOutcomes[index] = e.target.value;
                        setNewProject({ ...newProject, outcomes: updatedOutcomes });
                      }}
                      placeholder="e.g., Delivered on time"
                    />
                    <Button variant="destructive" size="sm" onClick={() => {
                      setNewProject({ ...newProject, outcomes: newProject.outcomes.filter((_, i) => i !== index) });
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setNewProject({ ...newProject, outcomes: [...newProject.outcomes, ""] })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Outcome
                </Button>
              </div>

              {/* Project Images */}
              <div>
                <Label htmlFor="projectImages">Project Images (Min 3)</Label>
                <Input id="projectImages" type="file" accept="image/*" multiple onChange={handleImageUpload} className="mb-2" />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {projectImages.map((img, index) => (
                    <div key={index} className="relative w-full h-24">
                      <img src={img} alt={`Project ${index}`} className="w-full h-full object-cover rounded-md" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="projectDescription">Description</Label>
                <Textarea
                  id="projectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe the project in detail"
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="projectStatus">Project Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value) => setNewProject({ ...newProject, status: value as Project["status"] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="under construction">Under Construction</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on hold">On Hold</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowProjectDialog(false)}>Cancel</Button>
              <Button onClick={handlePreviewProject} className="bg-blue-600 text-white hover:bg-blue-600/90">
                Preview Project
              </Button>
              <Button onClick={handleAddOrUpdateProject} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Project Preview Dialog */}
        <Dialog open={showProjectPreviewDialog} onOpenChange={setShowProjectPreviewDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Project Preview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{newProject.title || 'Untitled Project'}</h3>
              <p className="text-gray-700"><strong>Location:</strong> {newProject.location}</p>
              <p className="text-gray-700"><strong>Project Start Date:</strong> {newProject.startDate}</p>
              <p className="text-gray-700"><strong>Completed Date:</strong> {newProject.completedDate}</p>
              <p className="text-gray-700"><strong>Project Type:</strong> {newProject.projectType}</p>
              <p className="text-gray-700"><strong>Client:</strong> {newProject.client}</p>
              <p className="text-gray-700"><strong>Size:</strong> {newProject.size}</p>
              <p className="text-gray-700"><strong>Duration:</strong> {newProject.duration}</p>
              <p className="text-gray-700"><strong>No of Professionals:</strong> {newProject.professionals}</p>
              <p className="text-gray-700"><strong>Budget:</strong> {newProject.budget}</p>
              <p className="text-gray-700"><strong>Status:</strong> {newProject.status}</p>

              <div>
                <h4 className="font-semibold mt-4">Key Features:</h4>
                <ul className="list-disc pl-5">
                  {newProject.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mt-4">Challenges:</h4>
                <ul className="list-disc pl-5">
                  {newProject.challenges.map((challenge, index) => <li key={index}>{challenge}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mt-4">Outcomes:</h4>
                <ul className="list-disc pl-5">
                  {newProject.outcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mt-4">Project Images:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {projectImages.map((img, index) => (
                    <img key={index} src={img} alt={`Project Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                  ))}
                </div>
              </div>
              {newProject.description && (
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="text-gray-700">{newProject.description}</p>
                </div>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => { setShowProjectPreviewDialog(false); setShowProjectDialog(true); }}>
                Back to Edit
              </Button>
              <Button onClick={handleAddOrUpdateProject} className="bg-[#006d4e] text-white hover:bg-[#006d4e]/90">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Project Dialog */}
        <Dialog open={showViewProjectDialog} onOpenChange={setShowViewProjectDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
            </DialogHeader>
            {viewingProject && (
              <div className="space-y-4">
                <img src={viewingProject.image} alt={viewingProject.title} className="w-full h-64 object-cover rounded-md" />
                <h3 className="text-2xl font-bold">{viewingProject.title}</h3>
                <p className="text-gray-700"><strong>Location:</strong> {viewingProject.location}</p>
                <p className="text-gray-700"><strong>Project Start Date:</strong> {viewingProject.startDate}</p>
                <p className="text-gray-700"><strong>Completed Date:</strong> {viewingProject.completedDate}</p>
                <p className="text-gray-700"><strong>Project Type:</strong> {viewingProject.projectType}</p>
                <p className="text-gray-700"><strong>Client:</strong> {viewingProject.client}</p>
                <p className="text-gray-700"><strong>Size:</strong> {viewingProject.size}</p>
                <p className="text-gray-700"><strong>Duration:</strong> {viewingProject.duration}</p>
                <p className="text-gray-700"><strong>No of Professionals:</strong> {viewingProject.professionals}</p>
                <p className="text-gray-700"><strong>Budget:</strong> {viewingProject.budget}</p>
                <p className="text-gray-700"><strong>Status:</strong> {viewingProject.status}</p>

                <div>
                  <h4 className="font-semibold mt-4">Key Features:</h4>
                  <ul className="list-disc pl-5">
                    {viewingProject.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mt-4">Challenges:</h4>
                  <ul className="list-disc pl-5">
                    {viewingProject.challenges.map((challenge, index) => <li key={index}>{challenge}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mt-4">Outcomes:</h4>
                  <ul className="list-disc pl-5">
                    {viewingProject.outcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mt-4">Project Images:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {viewingProject.projectImages.map((img, index) => (
                      <img key={index} src={img} alt={`Project Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
                {viewingProject.description && (
                  <div>
                    <Label className="font-semibold">Description</Label>
                    <p className="text-gray-700">{viewingProject.description}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => { handleEditProject(viewingProject!); setShowViewProjectDialog(false); }} variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Edit Project
              </Button>
              <Button onClick={() => { handleDeleteProject(viewingProject!.id); setShowViewProjectDialog(false); }} variant="destructive">
                Delete Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Contact Messages</h2>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Subject</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{contact.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{contact.subject}</TableCell>
                        <TableCell className="hidden lg:table-cell">{contact.date}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contact.isRead ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {contact.isRead ? 'Read' : 'Unread'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewContact(contact)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            {!contact.isRead && (
                              <Button variant="outline" size="sm" onClick={() => handleMarkContactAsRead(contact.id)}>
                                <MailCheck className="h-3 w-3 sm:h-4 sm:w-4" /> Mark Read
                              </Button>
                            )}
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteContact(contact.id)}>
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

        {/* View Contact Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Contact Message Details</DialogTitle>
            </DialogHeader>
            {viewingContact && (
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">From</Label>
                  <p className="text-gray-700">{viewingContact.name} ({viewingContact.email})</p>
                </div>
                <div>
                  <Label className="font-semibold">Subject</Label>
                  <p className="text-gray-700">{viewingContact.subject}</p>
                </div>
                <div>
                  <Label className="font-semibold">Message</Label>
                  <p className="text-gray-700">{viewingContact.message}</p>
                </div>
                <div>
                  <Label className="font-semibold">Date</Label>
                  <p className="text-gray-700">{viewingContact.date}</p>
                </div>
                <DialogFooter>
                  {!viewingContact.isRead && (
                    <Button onClick={() => { handleMarkContactAsRead(viewingContact.id); setShowContactDialog(false); }} className="bg-green-600 text-white hover:bg-green-600/90">
                      Mark as Read
                    </Button>
                  )}
                  <Button onClick={() => window.location.href = `mailto:${viewingContact.email}`} variant="outline">
                    <MailCheck className="mr-2 h-4 w-4" /> Reply
                  </Button>
                  <Button onClick={() => { handleDeleteContact(viewingContact.id); setShowContactDialog(false); }} variant="destructive">
                    Delete Message
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Service Requests Tab */}
        {activeTab === 'service-requests' && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Service Requests</h2>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Service Type</TableHead>
                      <TableHead className="hidden md:table-cell">Project Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.clientName}</TableCell>
                        <TableCell className="hidden sm:table-cell">{request.serviceType}</TableCell>
                        <TableCell className="hidden md:table-cell">{request.projectType}</TableCell>
                        <TableCell className="hidden lg:table-cell">{request.submissionDate}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.isRead ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {request.isRead ? 'Read' : 'Unread'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewServiceRequest(request)} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            {!request.isRead && (
                              <Button variant="outline" size="sm" onClick={() => handleMarkServiceRequestAsRead(request.id)}>
                                <MailCheck className="h-3 w-3 sm:h-4 sm:w-4" /> Mark Read
                              </Button>
                            )}
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteServiceRequest(request.id)}>
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

        {/* View Service Request Dialog */}
        <Dialog open={showViewServiceRequestDialog} onOpenChange={setShowViewServiceRequestDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Service Request Details</DialogTitle>
            </DialogHeader>
            {viewingServiceRequest && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{viewingServiceRequest.projectType} ({viewingServiceRequest.serviceType})</h3>
                <p className="text-lg text-gray-700">Client: {viewingServiceRequest.clientName}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Email</Label>
                    <p className="text-gray-700">{viewingServiceRequest.email}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Phone</Label>
                    <p className="text-gray-700">{viewingServiceRequest.phone}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700">{viewingServiceRequest.propertyType}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Budget</Label>
                    <p className="text-gray-700">{viewingServiceRequest.budget}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Timeline</Label>
                    <p className="text-gray-700">{viewingServiceRequest.timeline}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Location</Label>
                    <p className="text-gray-700">{viewingServiceRequest.location}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingServiceRequest.submissionDate}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        viewingServiceRequest.isRead ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {viewingServiceRequest.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="text-gray-700">{viewingServiceRequest.description}</p>
                </div>
                <div>
                  <Label className="font-semibold">Images</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {viewingServiceRequest.images.map((img, index) => (
                      <img key={index} src={img} alt={`Service Request Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  {!viewingServiceRequest.isRead && (
                    <Button onClick={() => { handleMarkServiceRequestAsRead(viewingServiceRequest.id); setShowViewServiceRequestDialog(false); }} className="bg-green-600 text-white hover:bg-green-600/90">
                      Mark as Read
                    </Button>
                  )}
                  <Button onClick={() => window.location.href = `tel:${viewingServiceRequest.phone}`} variant="outline">
                    <Phone className="mr-2 h-4 w-4" /> Call Client
                  </Button>
                  <Button onClick={() => { handleDeleteServiceRequest(viewingServiceRequest.id); setShowViewServiceRequestDialog(false); }} variant="destructive">
                    Delete Request
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;