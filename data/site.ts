type SiteInfo = {
  name: string;
  tagline: string;
  description: string;
  contact: Record<
    | "address"
    | "phone"
    | "email"
    | "hours"
    | "whatsapp"
    | "mapEmbedUrl"
    | "mapUrl",
    string | null
  >;
  social: Record<
    "facebook" | "tiktok" | "instagram" | "linkedin",
    string | null
  >;
  owner: {
    name: string;
    title: string;
    image: string;
  };
};
export const site: SiteInfo = {
  name: "Techno Vision Group",
  tagline: "Engineering • Consultancy • Construction",
  description:
    "Engineering consultancy, thoughtful design and construction services brought together under one professional identity in Nepal.",
  contact: {
    address: null,
    phone: "9851169210",
    email: "techno.vision.np@gmail.com",
    hours: null,
    whatsapp: null,
    mapEmbedUrl:
      "https://www.google.com/maps?q=28.234324%2C83.988693&z=17&output=embed",
    mapUrl:
      "https://www.google.com/maps/place/28%C2%B014'03.6%22N+83%C2%B059'19.3%22E/@28.2342279,83.9877718,18.5z/data=!4m4!3m3!8m2!3d28.234324!4d83.988693!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
  },
  social: {
    facebook:
      "https://www.facebook.com/share/1CEG4CzdhD/?mibextid=wwXIfr",
    tiktok:
      "https://www.tiktok.com/@technovision343?_r=1&_t=ZS-9A1YkbNeMi5",
    instagram: null,
    linkedin: null,
  },
  owner: {
    name: "Er. Milan Adhikari",
    title: "Owner",
    image: "/images/optimized/owner.webp",
  },
};
export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
export const companies = [
  {
    id: "consultancy",
    number: "01",
    name: "Techno Vision Engineering Consultancy",
    short: "Engineering Consultancy",
    href: "/services/engineering-consultancy",
    image: "/images/optimized/project-9.webp",
    alt: "Site inspection of reinforced structural work",
    description:
      "Clarity before construction. Considered planning, precise design and practical engineering guidance for every stage of your project.",
    capabilities: [
      "Planning & design",
      "Survey & estimation",
      "Project supervision",
    ],
  },
  {
    id: "construction",
    number: "02",
    name: "Techno Vision Nirman Sewa",
    short: "Construction Services",
    href: "/services/construction",
    image: "/images/optimized/project-11-structure.webp",
    alt: "Multi-storey residential building under construction",
    description:
      "From drawings to built spaces. Coordinated construction, careful execution and attention to the details that make a project work.",
    capabilities: [
      "Buildings & civil works",
      "Infrastructure",
      "Renovation & finishing",
    ],
  },
] as const;
export const values = [
  {
    title: "Engineering integrity",
    description:
      "Decisions grounded in technical understanding, clear communication and the needs of the project.",
  },
  {
    title: "Quality in the details",
    description:
      "A considered approach to materials, design coordination and workmanship at every stage.",
  },
  {
    title: "Responsibility & safety",
    description:
      "Care for people, the surrounding community and the environments in which we work.",
  },
  {
    title: "Practical innovation",
    description:
      "Useful ideas that respond to real constraints, local context and long-term use.",
  },
  {
    title: "Client collaboration",
    description:
      "Listening closely, setting clear expectations and keeping the conversation open.",
  },
  {
    title: "Professionalism",
    description:
      "Organised documentation, thoughtful coordination and respect for everyone involved.",
  },
];
