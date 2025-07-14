import { useState } from "react";
import { Paintbrush, Hammer, Wrench, Palette, Home, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MobileNavigation from "@/components/MobileNavigation";
import Footer from "@/components/Footer";
import ResponsiveHero from "@/components/ResponsiveHero";
import ResponsiveCardGrid from "@/components/ResponsiveCardGrid";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Others = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    serviceType: "",
    description: "",
    urgency: "",
    preferredDate: ""
  });

  const services = [
    {
      icon: Hammer,
      title: t('others.services.houseRenovation'),
      description: t('others.services.houseRenovationDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Paintbrush,
      title: t('others.services.interiorPainting'),
      description: t('others.services.interiorPaintingDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Palette,
      title: t('others.services.exteriorPainting'),
      description: t('others.services.exteriorPaintingDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Wrench,
      title: t('others.services.kitchenRenovation'),
      description: t('others.services.kitchenRenovationDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Home,
      title: t('others.services.bathroomRenovation'),
      description: t('others.services.bathroomRenovationDesc'),
      color: "bg-[#006d4e]"
    },
    {
      icon: Hammer,
      title: t('others.services.flooring'),
      description: t('others.services.flooringDesc'),
      color: "bg-[#006d4e]"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('others.toast.title'),
      description: t('others.toast.description'),
    });
    console.log("Service request submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileNavigation />
      
      {/* Hero Section */}
      <ResponsiveHero
        icon={<Hammer className="mx-auto h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />}
        title={t('others.hero.title')}
        subtitle={t('others.hero.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Services Grid */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{t('others.services.title')}</h2>
            <p className="text-gray-600 text-base sm:text-lg">{t('others.services.subtitle')}</p>
          </div>
          
          <ResponsiveCardGrid columns={3}>
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => {
                  console.log(`Selected service: ${service.title}`);
                  // Add service selection logic here
                }}
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className={`${service.color} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </ResponsiveCardGrid>
        </div>

        {/* Service Request Form */}
        <Card className="shadow-xl max-w-4xl mx-auto">
          <CardHeader className="bg-[#006d4e] text-white p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl flex items-center">
              <Hammer className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              {t('others.form.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">{t('others.form.name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">{t('others.form.phone')} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">{t('others.form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium">{t('others.form.address')} *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Full property address"
                    required
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="serviceType" className="text-sm font-medium">{t('others.form.serviceType')} *</Label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base"
                  >
                    <option value="">Select Service</option>
                    <option value="house-renovation">{t('others.services.houseRenovation')}</option>
                    <option value="interior-painting">{t('others.services.interiorPainting')}</option>
                    <option value="exterior-painting">{t('others.services.exteriorPainting')}</option>
                    <option value="kitchen-renovation">{t('others.services.kitchenRenovation')}</option>
                    <option value="bathroom-renovation">{t('others.services.bathroomRenovation')}</option>
                    <option value="flooring">{t('others.services.flooring')}</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="urgency" className="text-sm font-medium">{t('others.form.urgency')} *</Label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base"
                  >
                    <option value="">Select Urgency</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="normal">Normal (1 month)</option>
                    <option value="flexible">Flexible (2+ months)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="preferredDate" className="text-sm font-medium">{t('others.form.preferredDate')}</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="mt-1 text-sm sm:text-base"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">{t('others.form.description')} *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Please describe your renovation or painting project in detail..."
                  required
                  rows={4}
                  className="mt-1 text-sm sm:text-base resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-sm font-medium">{t('others.form.upload')}</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-orange-400 transition-colors">
                  <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-2 text-sm sm:text-base">{t('others.form.uploadDesc')}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{t('others.form.uploadFormat')}</p>
                  <Button type="button" variant="outline" className="mt-3 text-sm sm:text-base">
                    {t('others.form.chooseImages')}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <Button 
                  type="submit" 
                  onClick={handleSubmit}
                  className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-base sm:text-lg py-3 sm:py-4 transition-all duration-200 hover:scale-105 transform cursor-pointer"
                >
                  {t('others.form.submit')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Others;
