export type PageSeoKey =
  | "home"
  | "about"
  | "services"
  | "booking"
  | "blog"
  | "testimonials"
  | "contact"
  | "notFound";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  type?: "website" | "article" | "profile";
  robots?: string;
};

export const pageSeo: Record<PageSeoKey, PageSeo> = {
  home: {
    title: "Online Nutritionist Pakistan, USA, UK | Dietrix",
    description:
      "Get a personalized diet plan from a certified nutritionist, 100% online. Real results for weight loss, PCOS, and diabetes — trusted by 1,800+ clients worldwide.",
    path: "/",
    keywords: [
      "online nutritionist consultation",
      "online nutritionist Pakistan",
      "online nutritionist USA",
      "online nutritionist UK",
      "online nutritionist Canada",
      "online nutritionist Germany",
      "online nutritionist France",
      "online nutritionist KSA",
      "online nutritionist Dubai",
      "online nutritionist Australia",
      "nutritionist in Pakistan online",
      "custom diet plan",
      "nutritionist online global",
      "personalized diet plan",
      "best online nutritionist",
      "best nutritionist for weight loss",
      "best nutritionist for PCOS",
      "best nutritionist for diabetes",
      "best nutritionist for gut health",
      "best nutritionist for meal planning",
      "best nutritionist in the World",
    ],
  },
  about: {
    title: "About Rimsha Naseer, Nutritionist | Dietrix",
    description:
      "Meet Rimsha Naseer, certified clinical nutritionist offering evidence-based online diet plans for weight loss, PCOS, diabetes, and gut health care worldwide.",
    path: "/about",
    keywords: [
      "Rimsha Naseer nutritionist",
      "certified clinical nutritionist",
      "online nutrition expert",
    ],
    type: "profile",
  },
  services: {
    title: "Diet Plans Pakistan, USA, UK & Global | Dietrix",
    description:
      "Compare online diet plans for Pakistan, UK, USA, Canada, Germany, France, KSA, Dubai, and Australia for weight loss, PCOS, and diabetes support online.",
    path: "/services",
    keywords: [
      "custom diet plan for weight loss",
      "diet plan Pakistan",
      "custom diet plan USA",
      "diet plan UK clients",
      "online diet plan England",
      "custom diet plan Canada",
      "online diet plan Germany",
      "online diet plan France",
      "diet plan Saudi Arabia",
      "custom diet plan Dubai",
      "custom diet plan Australia",
      "Pakistani diet plan for weight loss",
      "diet plan for PCOS",
      "meal plan for diabetes",
      "online nutrition services",
    ],
  },
  booking: {
    title: "Book Online Nutritionist Worldwide | Dietrix",
    description:
      "Book an online nutritionist for Pakistan, USA, UK, Canada, Germany, France, KSA, Dubai, or Australia and get a custom diet plan from home today online.",
    path: "/booking",
    keywords: [
      "book nutrition consultation online",
      "book nutritionist Pakistan online",
      "book online nutritionist USA",
      "book online nutritionist UK",
      "book online nutritionist Canada",
      "book online nutritionist Dubai",
      "book online nutritionist Australia",
      "online dietitian appointment",
      "nutritionist consultation worldwide",
    ],
  },
  blog: {
    title: "Global Nutrition Blog: Weight Loss Diet Plans",
    description:
      "Read nutrition guides for Pakistan, UK, USA, Canada, Germany, France, KSA, Dubai, and Australia on weight loss, PCOS, diabetes, and meal planning tips.",
    path: "/blog",
    keywords: [
      "nutrition blog",
      "Pakistan nutrition blog",
      "global nutrition blog",
      "online nutritionist USA blog",
      "online nutritionist UK blog",
      "Pakistani diet plan",
      "weight loss diet plan",
      "PCOS diet plan",
      "fitness nutrition tips",
    ],
  },
  testimonials: {
    title: "Nutritionist Reviews & Results | Dietrix",
    description:
      "See Dietrix Fit reviews, transformation stories, and client results from online weight loss, PCOS, diabetes, and meal planning coaching worldwide.",
    path: "/testimonials",
    keywords: [
      "online nutritionist reviews",
      "nutrition coaching testimonials",
      "diet plan results",
    ],
  },
  contact: {
    title: "Contact Online Nutritionist Worldwide | Dietrix",
    description:
      "Contact Dietrix Fit for online diet plans in Pakistan, USA, UK, Canada, Germany, France, KSA, Dubai, Australia, and worldwide support from home.",
    path: "/contact",
    keywords: [
      "contact online nutritionist",
      "contact nutritionist Pakistan",
      "contact online nutritionist USA",
      "contact online nutritionist UK",
      "contact nutritionist Dubai",
      "contact nutritionist Australia",
      "nutritionist WhatsApp consultation",
      "global diet plan support",
    ],
  },
  notFound: {
    title: "Page Not Found | Dietrix Fit",
    description:
      "The page could not be found. Explore Dietrix Fit services, blog guides, testimonials, or book an online nutrition consultation today worldwide now.",
    path: "/404",
    keywords: ["Dietrix Fit"],
    robots: "noindex, follow",
  },
};
