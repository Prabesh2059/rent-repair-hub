
import React from 'react';
import { Building, Bed, Bath, LayoutGrid } from 'lucide-react'; // Import icons
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui Button

// Define the interface for a single property object
interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
}

// Define the props interface for the PropertyCard component
interface PropertyCardProps {
  property: Property;
  bedsLabel?: string;
  bathsLabel?: string;
  sqftLabel?: string;
  viewDetailsLabel?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  bedsLabel = "Beds",
  bathsLabel = "Baths", 
  sqftLabel = "sqft",
  viewDetailsLabel = "View Details"
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Property Image */}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      {/* Property Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-gray-600 flex items-center mb-2">
          <Building className="h-4 w-4 mr-2" /> {/* Location icon */}
          {property.location}
        </p>

        {/* Price - Now in plain bold text */}
        <p className="text-2xl font-bold text-gray-800 mb-4">
          {property.price}
        </p>

        {/* Beds, Baths, Sqft */}
        <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" /> {/* Bed icon */}
            {property.beds} {bedsLabel}
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" /> {/* Bath icon */}
            {property.baths} {bathsLabel}
          </span>
          <span className="flex items-center">
            <LayoutGrid className="h-4 w-4 mr-1" /> {/* Sqft icon */}
            {property.sqft} {sqftLabel}
          </span>
        </div>

        {/* View Details Button (optional, you can add a link here) */}
        <Button className="w-full bg-[#006d4e] hover:bg-[006d4e]">
          {viewDetailsLabel}
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
