import { useState } from "react";
import { Search, Filter, MapPin, Calendar, CheckCircle, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import MobileNavigation from "@/components/MobileNavigation";
import Footer from "@/components/Footer";
import ResponsiveHero from "@/components/ResponsiveHero";
import ResponsiveCardGrid from "@/components/ResponsiveCardGrid";
import ResponsiveFilters from "@/components/ResponsiveFilters";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const completedProjects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      title: "Skyline Business Complex",
      location: "Downtown Financial District",
      completedDate: "March 2024",
      projectType: "commercial",
      client: "Metro Corporation",
      size: "250,000 sq ft",
      duration: "24 months",
      status: "completed"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      title: "Green Valley Residential",
      location: "Suburb Hills, North Side",
      completedDate: "January 2024",
      projectType: "residential",  
      client: "Valley Homes Ltd",
      size: "150 units",
      duration: "18 months",
      status: "completed"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      title: "Modern Office Tower",
      location: "Central Business District",
      completedDate: "November 2023",
      projectType: "commercial",
      client: "Tech Solutions Inc",
      size: "180,000 sq ft",
      duration: "30 months",
      status: "completed"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      title: "Luxury Resort Development",
      location: "Coastal Highway, East Bay",
      completedDate: "September 2023",
      projectType: "hospitality",
      client: "Coastal Resorts Group",
      size: "50 acres",
      duration: "36 months",
      status: "completed"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1590725140246-20acdee442be",
      title: "Heritage Mall Renovation",
      location: "Historic Downtown Area",
      completedDate: "July 2023",
      projectType: "renovation",
      client: "Heritage Properties",
      size: "300,000 sq ft",
      duration: "12 months",
      status: "completed"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5",
      title: "Smart City Infrastructure",
      location: "New Development Zone",
      completedDate: "May 2023",
      projectType: "infrastructure",
      client: "City Development Authority",
      size: "500 acres",
      duration: "48 months",
      status: "completed"
    }
  ];

  const filteredProjects = completedProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || project.projectType === typeFilter;
    const matchesLocation = !locationFilter || project.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    
    return matchesSearch && matchesType && matchesLocation && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MobileNavigation />
      
      {/* Hero Section */}
      <ResponsiveHero
        icon={<Trophy className="mx-auto h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{t("projects.title")}</h1>
          <p className="text-gray-600 text-base sm:text-lg">{t("projects.subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <ResponsiveFilters>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <Input
              placeholder={t("projects.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 text-sm sm:text-base"
            />
          </div>
          
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base"
          >
            <option value="">{t("projects.filters.allLocations")}</option>
            <option value="downtown">Downtown</option>
            <option value="suburb">Suburb</option>
            <option value="central">Central</option>
            <option value="coastal">Coastal</option>
            <option value="historic">Historic</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base"
          >
            <option value="">{t("projects.filters.allStatus")}</option>
            <option value="completed">{t("projects.filters.completed")}</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 sm:h-10 px-3 border border-gray-300 rounded-md text-sm sm:text-base"
          >
            <option value="">{t("projects.filters.allTypes")}</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="hospitality">Hospitality</option>
            <option value="renovation">Renovation</option>
            <option value="infrastructure">Infrastructure</option>
          </select>

          <Button className="bg-[#006d4e] hover:bg-[#005a3f] w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            {t("projects.filters.apply")}
          </Button>
        </ResponsiveFilters>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {t("projects.results.showing")} {filteredProjects.length} {t("projects.results.of")} {completedProjects.length} {t("projects.results.projects")}
          </p>
        </div>

        {/* Projects Grid */}
        <ResponsiveCardGrid columns={3}>
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#006d4e] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {t("projects.project.completed")}
                </div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {project.projectType}
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {project.completedDate}
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-2 flex items-center text-sm sm:text-base">
                  <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </p>
                <p className="text-gray-600 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <Users className="mr-1 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{t("projects.project.client")}: {project.client}</span>
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <div className="flex flex-col">
                    <span className="font-semibold">{t("projects.project.size")}</span>
                    <span>{project.size}</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="font-semibold">{t("projects.project.duration")}</span>
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold">{t("projects.project.status")}</span>
                    <span className="text-[#006d4e] font-semibold">✓ {t("projects.project.completed")}</span>
                  </div>
                </div>
                <Button className="w-full bg-[#006d4e] hover:bg-[#005a3f] text-sm sm:text-base">
                  {t("projects.project.viewDetails")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </ResponsiveCardGrid>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg mb-4">{t("projects.noResults.message")}</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setTypeFilter("");
                setLocationFilter("");
              }}
              className="bg-[#006d4e] hover:bg-[#005a3f]"
            >
              {t("projects.noResults.clearFilters")}
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Projects;
