import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Bed, Bath, LayoutGrid, Calendar,
  User, Phone, Mail, Heart, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const getAllProperties = () => [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Modern Family Home",
    location: "Downtown, City Center",
    price: "रू 4,50,00,000",
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "house",
    description: "A beautiful modern family home located in the heart of the city center. This property features contemporary design with spacious rooms, natural lighting, and premium finishes throughout.",
    features: ["Modern Kitchen", "Garden View", "Parking Space", "24/7 Security", "Swimming Pool", "Gym Access"],
    yearBuilt: 2020,
    contact: {
      agent: "Real Estate Crafters International Private Limited",
      phone: "+977 970-7362231",
      email: "realestatecrafters1@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811"
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    title: "Luxury Villa with Pool",
    location: "123 Ocean View Drive",
    price: "रू 1,20,00,000",
    beds: 5,
    baths: 4,
    sqft: 3500,
    type: "house",
    description: "An exclusive luxury villa featuring a private swimming pool and breathtaking ocean views. Perfect for those seeking the ultimate in comfort and sophistication.",
    features: ["Private Pool", "Ocean View", "Wine Cellar", "Home Theater", "Guest House", "3-Car Garage"],
    yearBuilt: 2021,
    contact: {
      agent: "Real Estate Crafters International Private Limited",
      phone: "+977 970-7362231",
      email: "realestatecrafters1@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
    title: "Cozy Apartment in Downtown",
    location: "456 City Center Plaza",
    price: "रू 45,00,000",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "apartment",
    description: "A cozy and modern apartment in the bustling downtown area. Close to shopping, dining, and entertainment venues.",
    features: ["City Views", "Modern Appliances", "Balcony", "Elevator Access", "Concierge Service"],
    yearBuilt: 2019,
    contact: {
       agent: "Real Estate Crafters International Private Limited",
      phone: "+977 970-7362231",
      email: "realestatecrafters1@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    ]
  }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // ✅ Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const property = getAllProperties().find(p => p.id === parseInt(id || "0"));

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)} className="bg-[#006d4e] hover:bg-[#005a3f]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="mb-6 hover:bg-[#006d4e] hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg mb-4"
              />
              {property.images && property.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {property.images.slice(1, 4).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                    <p className="text-gray-600 flex items-center text-lg">
                      <MapPin className="mr-2 h-5 w-5" />
                      {property.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-4xl font-bold text-[#006d4e] mb-6">
                  {property.price}
                </div>

                <div className="grid grid-cols-4 gap-6 py-6 border-y border-gray-200 mb-6">
                  <div className="text-center">
                    <Bed className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.beds}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.baths}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <LayoutGrid className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.sqft}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="mx-auto mb-2 h-6 w-6 text-[#006d4e]" />
                    <div className="text-2xl font-bold">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-[#006d4e] rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Agent</h3>

              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3">
               <img
               src="/images/realstate-removebg-preview.png"  // <-- Put your company image path or URL here
               alt="Company Logo"
               className="w-full h-full object-cover"
               />
              </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">{property.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">{property.contact.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#006d4e] hover:bg-[#005a3f]"
                    onClick={() => window.location.href = `tel:${property.contact.phone}`}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
