
import { Bed, Bath, Square, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

interface PropertyCardProps {
  property: Property;
  bedsLabel?: string;
  bathsLabel?: string;
  sqftLabel?: string;
  viewDetailsLabel?: string;
}

const PropertyCard = ({ 
  property, 
  bedsLabel = "beds", 
  bathsLabel = "baths", 
  sqftLabel = "sqft",
  viewDetailsLabel = "View Details"
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 transform bg-white">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${
            isLiked
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </button>
      </div>
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-1">
          {property.location}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-[#006d4e] mb-3 sm:mb-4">
          {property.price}
        </p>
        
        <div className="flex items-center gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
          <div className="flex items-center gap-1">
            <Bed className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{property.beds} {bedsLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{property.baths} {bathsLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{property.sqft} {sqftLabel}</span>
          </div>
        </div>
        
        <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-white transition-all duration-200 hover:scale-105 transform text-sm sm:text-base">
          {viewDetailsLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
