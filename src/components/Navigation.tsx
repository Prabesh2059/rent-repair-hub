import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingCart,
  DollarSign,
  Building2,
  Grid,
  PhoneCall,
  Globe,
  Languages,
  Info,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  // Close menu when navigating or on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      // Now, if window width is >= sm (640px), close mobile menu
      if (window.innerWidth >= 640) { // Corresponds to Tailwind's 'sm' breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    setIsMenuOpen(false); // Close menu when component mounts or location changes
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  // Handle keyboard shortcut for login
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        navigate("/login");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const navLinks = [
    { name: t("nav.home"), path: "/", icon: Home },
    { name: t("nav.buy"), path: "/buy", icon: ShoppingCart },
    { name: t("nav.sell"), path: "/sell", icon: DollarSign },
    { name: t("nav.rent"), path: "/rent", icon: Building2 },
    { name: t("nav.Projects"), path: "/projects", icon: Grid },
    { name: t("nav.others"), path: "/others", icon: Globe },
    { name: t("nav.about"), path: "/about", icon: Info },
    { name: t("nav.contact"), path: "/contact", icon: PhoneCall },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 py-2">
            <img
              src="/images/realstate-removebg-preview.png"
              alt="Real Estate Crafters Logo"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain animate-entrance-logo"
            />
            <div className="leading-tight flex flex-col justify-center">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#006d4e] animate-entrance-text whitespace-nowrap sm:whitespace-normal">
                Real Estate Crafters
              </p>
              <p className="text-xs sm:text-sm md:text-base text-brand animate-entrance-text whitespace-nowrap sm:whitespace-normal">
                International Private Limited
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links and Language Toggle - Now hidden on 'sm' and below */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center gap-1.5 px-2 py-1.5 text-sm lg:text-base xl:text-lg font-medium transition-all duration-200 rounded-md hover:scale-105 transform ${
                  isActive(path)
                    ? "text-[#006d4e] font-semibold"
                    : "text-gray-600 hover:text-[#006d4e] hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                {name}
                {isActive(path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006d4e] rounded-full"></span>
                )}
              </Link>
            ))}

            {/* Desktop Language Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 border-[#006d4e] bg-[#006d4e] text-white transition-all duration-200
                         h-8 px-2 text-xs sm:text-sm lg:h-9 lg:px-3 lg:text-base hover:scale-105 transform
                         hover:bg-opacity-90 focus:bg-opacity-90 flex-shrink-0"
            >
              <Languages className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              <span className="font-medium">
                {language === 'en' ? 'EN-नेपा' : 'नेपा-EN'}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Toggle (now visible from 'sm' and below) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-gray-600 hover:text-[#006d4e] transition-all duration-200 p-1 hover:scale-110 transform"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
              ) : (
                <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (now visible when isMenuOpen is true AND screen is 'sm' or smaller) */}
        {isMenuOpen && (
          <div className="sm:hidden mt-2 border-t pt-4 pb-6 animate-fade-in origin-top">
            <div className="flex flex-col gap-3">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-base sm:text-lg font-medium transition-all duration-200 rounded-md hover:scale-105 transform ${
                    isActive(path)
                      ? "text-[#006d4e] bg-green-50 font-semibold"
                      : "text-gray-700 hover:text-[#006d4e] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  {name}
                </Link>
              ))}

              {/* Language Toggle Button INSIDE mobile menu */}
              <div className="px-3 pt-4 border-t border-gray-100 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-center flex items-center gap-2 border-[#006d4e] bg-[#006d4e] text-white transition-all duration-200
                             h-9 px-4 text-sm hover:scale-100 transform rounded-md
                             hover:bg-opacity-90 focus:bg-opacity-90"
                >
                  <Languages className="h-4 w-4" />
                  <span className="font-medium">
                    {language === 'en' ? 'EN-नेपा' : 'नेपा-EN'}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;