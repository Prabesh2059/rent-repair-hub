
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, User, Award, Users, Briefcase, Star } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const { t } = useLanguage();
  
  // Animation states for statistics
  const [experienceCount, setExperienceCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Target values
  const targetExperience = 15;
  const targetProjects = 500;
  const targetClients = 1200;

  // Animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setExperienceCount(Math.round(targetExperience * easeOut));
      setProjectsCount(Math.round(targetProjects * easeOut));
      setClientsCount(Math.round(targetClients * easeOut));

      currentStep++;

      if (currentStep > steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const branches = [
    {
      name: t("about.branches.branch1.name"),
      location: t("about.branches.branch1.location"),
      image: "/images/branch1.jpg"
    },
    {
      name: t("about.branches.branch2.name"),
      location: t("about.branches.branch2.location"),
      image: "/images/branch2.jpg"
    },
    {
      name: t("about.branches.branch3.name"),
      location: t("about.branches.branch3.location"),
      image: "/images/branch3.jpg"
    },
    {
      name: t("about.branches.branch4.name"),
      location: t("about.branches.branch4.location"),
      image: "/images/branch4.jpg"
    }
  ];

  // Sample client reviews - in real app, this would come from admin panel
  const clientReviews = [
    {
      id: 1,
      name: t("about.reviews.client1.name"),
      rating: 5,
      review: t("about.reviews.client1.review"),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: t("about.reviews.client2.name"),
      rating: 5,
      review: t("about.reviews.client2.review"),
      image: "https://images.unsplash.com/photo-1494790108755-2616b4cf9c85?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: t("about.reviews.client3.name"),
      rating: 4,
      review: t("about.reviews.client3.review"),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t("about.title")}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto animate-fade-in">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.stats.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("about.stats.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 hover-scale">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {experienceCount}+
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t("about.stats.experience")}
                </h3>
                <p className="text-gray-600">
                  {t("about.stats.experienceDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 hover-scale">
              <CardContent className="p-8">
                <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {projectsCount}+
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t("about.stats.projects")}
                </h3>
                <p className="text-gray-600">
                  {t("about.stats.projectsDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 hover-scale">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {clientsCount}+
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t("about.stats.clients")}
                </h3>
                <p className="text-gray-600">
                  {t("about.stats.clientsDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.branches.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("about.branches.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {branches.map((branch, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover-scale">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop";
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5 text-green-600" />
                    {branch.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{branch.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.ceo.title")}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-green-200">
                      <img
                        src="/images/ceo.jpg"
                        alt={t("about.ceo.name")}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop";
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                      <User className="h-6 w-6 text-green-600" />
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {t("about.ceo.name")}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {t("about.ceo.description")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.reviews.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("about.reviews.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300 hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{review.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
