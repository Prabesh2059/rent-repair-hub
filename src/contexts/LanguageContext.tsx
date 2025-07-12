
import Projects from '@/pages/Projects';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LanguageContextProps {
  language: 'en' | 'np';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations = {
  en: {
    nav: {
      home: "Home",
      buy: "Buy",
      sell: "Sell", 
      rent: "Rent",
      others: "Others",
      contact: "Contact",
      Projects: "Projects",
      about: "About",
    },
    home: {
      hero: {
        title: "Find Your Dream Home",
        subtitle: "Explore a wide range of properties and real estate services.",
      },
      search: {
        location: "Enter Location",
        price: "Select Price Range",
        type: "Select Property Type",
        button: "Search",
      },
      featured: {
        title: "Featured Properties",
        subtitle: "Explore our handpicked selection of premium properties.",
      },
      action: {
        buy: {
          title: "Buy a Home",
          desc: "Find the perfect property to call your own.",
        },
        sell: {
          title: "Sell Your Property",
          desc: "Get the best value for your property with our expert services.",
        },
        rent: {
          title: "Rent a Property",
          desc: "Discover a variety of rental options in your desired location.",
        },
        others: {
          title: "Explore More",
          desc: "Discover a variety of other services and opportunities.",
        }
      },
    },
    buy: {
      title: "Buy Property",
      subtitle: "Discover your perfect property from our extensive collection of homes and commercial spaces.",
      filters: {
        location: "Location",
        priceRange: "Price Range",
        propertyType: "Property Type",
        bedrooms: "Bedrooms",
        search: "Search Properties"
      }
    },
    sell: {
      title: "Sell Your Property",
      subtitle: "Get the best value for your property with our professional selling services.",
      form: {
        title: "Property Details",
        propertyType: "Property Type",
        location: "Property Location",
        price: "Expected Price",
        bedrooms: "Number of Bedrooms",
        bathrooms: "Number of Bathrooms",
        area: "Total Area (sq ft)",
        description: "Property Description",
        submit: "List Property"
      }
    },
    rent: {
      title: "Rent Property",
      subtitle: "Find your ideal rental property from our carefully curated selection.",
      filters: {
        location: "Location",
        rentRange: "Rent Range",
        propertyType: "Property Type",
        bedrooms: "Bedrooms",
        search: "Search Rentals"
      }
    },
    projects: {
      title: "Our Projects",
      subtitle: "Explore our completed and ongoing real estate development projects.",
      status: {
        completed: "Completed",
        ongoing: "Ongoing",
        upcoming: "Upcoming"
      },
      details: {
        location: "Location",
        units: "Total Units",
        completion: "Completion Date"
      }
    },
    about: {
      title: "About Us",
      subtitle: "Real Estate Crafters International Private Limited is a leading real estate company committed to providing exceptional property services.",
      stats: {
        title: "Our Achievements",
        subtitle: "Years of dedication and excellence in the real estate industry.",
        experience: "Years of Experience",
        experienceDesc: "Serving clients with dedication and expertise",
        projects: "Completed Projects",
        projectsDesc: "Successfully delivered residential and commercial projects",
        clients: "Happy Clients",
        clientsDesc: "Satisfied customers who trust our services"
      },
      branches: {
        title: "Our Branches",
        subtitle: "We have established our presence across multiple locations to serve you better.",
        branch1: {
          name: "Kathmandu Branch",
          location: "Thamel, Kathmandu, Nepal"
        },
        branch2: {
          name: "Pokhara Branch", 
          location: "Lakeside, Pokhara, Nepal"
        },
        branch3: {
          name: "Chitwan Branch",
          location: "Bharatpur, Chitwan, Nepal"
        },
        branch4: {
          name: "Butwal Branch",
          location: "Traffic Chowk, Butwal, Nepal"
        }
      },
      ceo: {
        title: "Chief Executive Officer",
        name: "Mr. Aarman",
        description: "Leading the company with vision and expertise in real estate industry. With over 15 years of experience, he has successfully guided our organization to become a trusted name in the real estate sector."
      },
      reviews: {
        title: "What Our Clients Say",
        subtitle: "Read testimonials from our satisfied customers who have experienced our exceptional service.",
        client1: {
          name: "John Smith",
          review: "Excellent service! They helped me find my dream home within my budget. Highly professional and reliable."
        },
        client2: {
          name: "Sarah Johnson",
          review: "Outstanding experience selling my property. The team was very supportive throughout the entire process."
        },
        client3: {
          name: "Michael Brown",
          review: "Great rental service! Found the perfect apartment in my preferred location. Very responsive team."
        }
      }
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team for any inquiries.",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        button: "Send Message",
      },
      info: {
        address: "123 Real Estate St, City, State 12345",
        phone: "(555) 123-4567",
        email: "info@realestatecrafters.com",
      },
    },
    others: {
      hero: {
        title: "Professional Home Services",
        subtitle: "Transform your space with our expert renovation and painting services.",
      },
      services: {
        title: "Our Services",
        subtitle: "Professional home improvement services tailored to your needs.",
        houseRenovation: "House Renovation",
        houseRenovationDesc: "Complete home transformation with modern design and quality craftsmanship.",
        interiorPainting: "Interior Painting",
        interiorPaintingDesc: "Professional interior painting services to refresh your living spaces.",
        exteriorPainting: "Exterior Painting",
        exteriorPaintingDesc: "Weather-resistant exterior painting to protect and beautify your home.",
        kitchenRenovation: "Kitchen Renovation",
        kitchenRenovationDesc: "Modern kitchen designs with premium materials and appliances.",
        bathroomRenovation: "Bathroom Renovation",
        bathroomRenovationDesc: "Luxurious bathroom upgrades with contemporary fixtures and finishes.",
        flooring: "Flooring Services",
        flooringDesc: "Professional flooring installation including hardwood, tile, and carpet.",
      },
      form: {
        title: "Request Service Quote",
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address",
        address: "Property Address",
        serviceType: "Service Type",
        urgency: "Project Urgency",
        preferredDate: "Preferred Start Date",
        description: "Project Description",
        upload: "Upload Images",
        uploadDesc: "Upload images of your space to help us better understand your project",
        uploadFormat: "Supported formats: JPG, PNG, PDF (Max 5MB each)",
        chooseImages: "Choose Images",
        submit: "Submit Request",
      },
      toast: {
        title: "Service Request Submitted!",
        description: "We'll contact you within 24 hours to discuss your project.",
      },
    },
    common: {
      company: "Real Estate Crafters International Private Limited",
      tagline: "Your trusted partner in real estate solutions",
      featured: "Featured",
      beds: "Beds",
      baths: "Baths",
      callNow: "Call Now",
      phone: "Phone"
    },
  },
  np: {
    nav: {
      home: "गृह",
      buy: "किन्नुहोस्",
      sell: "बेच्नुहोस्",
      rent: "भाडामा",
      others: "अन्य",
      contact: "सम्पर्क",
      Projects: "परियोजनाहरू",
      about: "हाम्रो बारेमा",
    },
    home: {
      hero: {
        title: "आफ्नो सपनाको घर खोज्नुहोस्",
        subtitle: "विभिन्न सम्पत्तिहरू र घर जग्गा सेवाहरू अन्वेषण गर्नुहोस्।",
      },
      search: {
        location: "स्थान प्रविष्ट गर्नुहोस्",
        price: "मूल्य दायरा चयन गर्नुहोस्",
        type: "सम्पत्ति प्रकार चयन गर्नुहोस्",
        button: "खोज्नुहोस्",
      },
      featured: {
        title: "विशेष गुणहरू",
        subtitle: "हाम्रो प्रीमियम गुणहरूको ह्यान्डपिक गरिएको चयन अन्वेषण गर्नुहोस्।",
      },
      action: {
        buy: {
          title: "घर किन्नुहोस्",
          desc: "आफ्नो लागि कल गर्नको लागि उत्तम सम्पत्ति खोज्नुहोस्।",
        },
        sell: {
          title: "आफ्नो सम्पत्ति बेच्नुहोस्",
          desc: "हाम्रो विशेषज्ञ सेवाहरूको साथ आफ्नो सम्पत्तिको लागि उत्तम मूल्य प्राप्त गर्नुहोस्।",
        },
        rent: {
          title: "सम्पत्ति भाडामा लिनुहोस्",
          desc: "तपाईंको इच्छित स्थानमा विभिन्न भाडा विकल्पहरू पत्ता लगाउनुहोस्।",
        },
        others: {
          title: "थप अन्वेषण गर्नुहोस्",
          desc: "विभिन्न अन्य सेवाहरू र अवसरहरू पत्ता लगाउनुहोस्।",
        }
      },
    },
    buy: {
      title: "सम्पत्ति किन्नुहोस्",
      subtitle: "घर र व्यावसायिक स्थानहरूको हाम्रो व्यापक संग्रहबाट आफ्नो उत्तम सम्पत्ति पत्ता लगाउनुहोस्।",
      filters: {
        location: "स्थान",
        priceRange: "मूल्य दायरा",
        propertyType: "सम्पत्ति प्रकार",
        bedrooms: "शयनकक्षहरू",
        search: "सम्पत्तिहरू खोज्नुहोस्"
      }
    },
    sell: {
      title: "आफ्नो सम्पत्ति बेच्नुहोस्",
      subtitle: "हाम्रो व्यावसायिक बिक्री सेवाहरूको साथ आफ्नो सम्पत्तिको लागि उत्तम मूल्य प्राप्त गर्नुहोस्।",
      form: {
        title: "सम्पत्ति विवरणहरू",
        propertyType: "सम्पत्ति प्रकार",
        location: "सम्पत्ति स्थान",
        price: "अपेक्षित मूल्य",
        bedrooms: "शयनकक्षहरूको संख्या",
        bathrooms: "बाथरूमहरूको संख्या",
        area: "कुल क्षेत्रफल (वर्ग फिट)",
        description: "सम्पत्ति विवरण",
        submit: "सम्पत्ति सूचीबद्ध गर्नुहोस्"
      }
    },
    rent: {
      title: "सम्पत्ति भाडामा",
      subtitle: "हाम्रो सावधानीपूर्वक चयन गरिएको संग्रहबाट आफ्नो आदर्श भाडा सम्पत्ति पत्ता लगाउनुहोस्।",
      filters: {
        location: "स्थान",
        rentRange: "भाडा दायरा",
        propertyType: "सम्पत्ति प्रकार",
        bedrooms: "शयनकक्षहरू",
        search: "भाडाहरू खोज्नुहोस्"
      }
    },
    projects: {
      title: "हाम्रा परियोजनाहरू",
      subtitle: "हाम्रो पूरा भएका र चलिरहेका घरजग्गा विकास परियोजनाहरू अन्वेषण गर्नुहोस्।",
      status: {
        completed: "पूरा भएको",
        ongoing: "चलिरहेको",
        upcoming: "आगामी"
      },
      details: {
        location: "स्थान",
        units: "कुल एकाइहरू",
        completion: "पूर्णता मिति"
      }
    },
    about: {
      title: "हाम्रो बारेमा",
      subtitle: "रियल एस्टेट क्राफ्टर्स इन्टरनेशनल प्राइभेट लिमिटेड एक अग्रणी रियल एस्टेट कम्पनी हो जुन असाधारण सम्पत्ति सेवाहरू प्रदान गर्न प्रतिबद्ध छ।",
      stats: {
        title: "हाम्रा उपलब्धिहरू",
        subtitle: "रियल एस्टेट उद्योगमा समर्पण र उत्कृष्टताका वर्षहरू।",
        experience: "अनुभवका वर्षहरू",
        experienceDesc: "समर्पण र विशेषज्ञताको साथ ग्राहकहरूको सेवा गर्दै",
        projects: "पूरा भएका परियोजनाहरू",
        projectsDesc: "सफलतापूर्वक आवासीय र व्यावसायिक परियोजनाहरू प्रदान गरिएको",
        clients: "खुसी ग्राहकहरू",
        clientsDesc: "हाम्रो सेवामा भरोसा गर्ने सन्तुष्ट ग्राहकहरू"
      },
      branches: {
        title: "हाम्रा शाखाहरू",
        subtitle: "हामीले तपाईंलाई राम्रो सेवा दिन विभिन्न स्थानहरूमा हाम्रो उपस्थिति स्थापना गरेका छौं।",
        branch1: {
          name: "काठमाडौं शाखा",
          location: "ठमेल, काठमाडौं, नेपाल"
        },
        branch2: {
          name: "पोखरा शाखा",
          location: "लेकसाइड, पोखरा, नेपाल"
        },
        branch3: {
          name: "चितवन शाखा",
          location: "भरतपुर, चितवन, नेपाल"
        },
        branch4: {
          name: "बुटवल शाखा",
          location: "ट्राफिक चोक, बुटवल, नेपाल"
        }
      },
      ceo: {
        title: "प्रमुख कार्यकारी अधिकारी",
        name: "श्री आर्मन",
        description: "रियल एस्टेट उद्योगमा दृष्टिकोण र विशेषज्ञताको साथ कम्पनीको नेतृत्व गर्दै। १५ वर्षभन्दा बढी अनुभवको साथ, उहाँले हाम्रो संस्थालाई रियल एस्टेट क्षेत्रमा एक विश्वसनीय नाम बन्न सफलतापूर्वक मार्गदर्शन गर्नुभएको छ।"
      },
      reviews: {
        title: "हाम्रा ग्राहकहरूले के भन्छन्",
        subtitle: "हाम्रो असाधारण सेवा अनुभव गरेका सन्तुष्ट ग्राहकहरूका प्रशंसापत्रहरू पढ्नुहोस्।",
        client1: {
          name: "राम श्रेष्ठ",
          review: "उत्कृष्ट सेवा! तिनीहरूले मलाई मेरो बजेट भित्र मेरो सपनाको घर फेला पार्न मद्दत गरे। अत्यधिक व्यावसायिक र भरपर्दो।"
        },
        client2: {
          name: "सीता पौडेल",
          review: "मेरो सम्पत्ति बेच्ने उत्कृष्ट अनुभव। टोली सम्पूर्ण प्रक्रियामा धेरै सहयोगी थियो।"
        },
        client3: {
          name: "गोपाल तामाङ",
          review: "उत्कृष्ट भाडा सेवा! मेरो मनपर्ने स्थानमा उत्तम अपार्टमेन्ट भेट्टाए। धेरै उत्तरदायी टोली।"
        }
      }
    },
    contact: {
      title: "हामीलाई सम्पर्क गर्नुहोस्",
      subtitle: "कुनै पनि जिज्ञासाको लागि हाम्रो टीमसँग सम्पर्कमा रहनुहोस्।",
      form: {
        name: "तपाईंको नाम",
        email: "तपाईंको इमेल",
        message: "तपाईंको सन्देश",
        button: "सन्देश पठाउनुहोस्",
      },
      info: {
        address: "123 रियल एस्टेट सेन्ट, शहर, राज्य 12345",
        phone: "(555) 123-4567",
        email: "info@realestatecrafters.com",
      },
    },
    others: {
      hero: {
        title: "व्यावसायिक घर सेवाहरू",
        subtitle: "हाम्रो विशेषज्ञ नवीकरण र पेन्टिङ सेवाहरूको साथ आफ्नो स्थान परिवर्तन गर्नुहोस्।",
      },
      services: {
        title: "हाम्रा सेवाहरू",
        subtitle: "तपाईंको आवश्यकता अनुसार व्यावसायिक घर सुधार सेवाहरू।",
        houseRenovation: "घर नवीकरण",
        houseRenovationDesc: "आधुनिक डिजाइन र गुणस्तरीय शिल्पकलाको साथ पूर्ण घर परिवर्तन।",
        interiorPainting: "भित्री पेन्टिङ",
        interiorPaintingDesc: "तपाईंको बसोबासको ठाउँहरू ताजा पार्न व्यावसायिक भित्री पेन्टिङ सेवाहरू।",
        exteriorPainting: "बाहिरी पेन्टिङ",
        exteriorPaintingDesc: "तपाईंको घरलाई सुरक्षित र सुन्दर बनाउन मौसम प्रतिरोधी बाहिरी पेन्टिङ।",
        kitchenRenovation: "भान्साकोठा नवीकरण",
        kitchenRenovationDesc: "प्रिमियम सामग्री र उपकरणहरूको साथ आधुनिक भान्साकोठा डिजाइन।",
        bathroomRenovation: "बाथरूम नवीकरण",
        bathroomRenovationDesc: "समकालीन फिक्स्चर र फिनिसिङको साथ विलासी बाथरूम अपग्रेड।",
        flooring: "फ्लोरिङ सेवाहरू",
        flooringDesc: "हार्डवुड, टाइल र कार्पेट सहित व्यावसायिक फ्लोरिङ स्थापना।",
      },
      form: {
        title: "सेवा कोट अनुरोध गर्नुहोस्",
        name: "पूरा नाम",
        phone: "फोन नम्बर",
        email: "इमेल ठेगाना",
        address: "सम्पत्ति ठेगाना",
        serviceType: "सेवा प्रकार",
        urgency: "परियोजना तत्काल",
        preferredDate: "मनपर्ने सुरुवात मिति",
        description: "परियोजना विवरण",
        upload: "छविहरू अपलोड गर्नुहोस्",
        uploadDesc: "तपाईंको परियोजनालाई राम्रोसँग बुझ्न मद्दत गर्न तपाईंको स्थानका छविहरू अपलोड गर्नुहोस्",
        uploadFormat: "समर्थित ढाँचाहरू: JPG, PNG, PDF (प्रत्येक अधिकतम 5MB)",
        chooseImages: "छविहरू छनौट गर्नुहोस्",
        submit: "अनुरोध पेश गर्नुहोस्",
      },
      toast: {
        title: "सेवा अनुरोध पेश गरियो!",
        description: "हामी तपाईंको परियोजनाको बारेमा छलफल गर्न 24 घण्टा भित्र तपाईंलाई सम्पर्क गर्नेछौं।",
      },
    },
    common: {
      company: "रियल एस्टेट क्राफ्टर्स इन्टरनेशनल प्राइभेट लिमिटेड",
      tagline: "रियल एस्टेट समाधानमा तपाईंको विश्वसनीय साझेदार",
      featured: "विशेष",
      beds: "शैया",
      baths: "बाथरूम",
      callNow: "अहिले कल गर्नुहोस्",
      phone: "फोन"
    },
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'np'>(
    (localStorage.getItem('language') as 'en' | 'np') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'np' : 'en'));
  }, []);

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [language]);

  const value = { language, toggleLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
