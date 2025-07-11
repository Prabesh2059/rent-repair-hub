
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

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
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-[#006d4e] text-white px-3 py-1 rounded-full text-sm font-semibold">
          {t("buy.property.forSale")}
        </div>
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.price}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          {property.location}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="mr-1 h-4 w-4" />
            {property.beds} {t("buy.property.beds")}
          </div>
          <div className="flex items-center">
            <Bath className="mr-1 h-4 w-4" />
            {property.baths} {t("buy.property.baths")}
          </div>
          <div className="flex items-center">
            <Square className="mr-1 h-4 w-4" />
            {property.sqft} sq ft
          </div>
        </div>
        <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f]">
          {t("buy.property.contact")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
