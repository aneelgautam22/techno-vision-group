export const projectFilters = [
  "All",
  "Ongoing",
  "Completed",
  "Renovation",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Renovation";
  filterCategory: Exclude<ProjectFilter, "All">;
  business: "Consultancy" | "Construction";
  image: string;
  alt: string;
  status: "Ongoing" | "Completed";
  overview: string;
  scope: string[];
  challenge: string;
  approach: string;
  gallery: string[];
};

const ongoingImages = [
  "project-1.webp",
  "project-2.webp",
  "project-3.webp",
  "project-4.webp",
  "project-5.webp",
  "project-6.webp",
  "project-7.webp",
  "project-8.webp",
  "project-9.webp",
  "project-10.webp",
  "project-11-structure.webp",
  "project-12-site.webp",
] as const;

const ongoingProjects: Project[] = ongoingImages.map((file, index) => {
  const number = String(index + 1).padStart(2, "0");
  const image = `/images/optimized/${file}`;
  return {
    slug: `ongoing-project-${number}`,
    title:
      index === 10
        ? "Residential Construction — Ongoing"
        : `Ongoing Project ${number}`,
    category: "Residential",
    filterCategory: "Ongoing",
    business: "Construction",
    image,
    alt:
      index === 10
        ? "Multi-storey residential building under construction"
        : `Ongoing construction project ${number}`,
    status: "Ongoing",
    overview:
      "A view from ongoing construction work managed by Techno Vision Nirman Sewa.",
    scope: ["Construction work", "Site coordination", "Quality review"],
    challenge:
      "Coordinate materials, workmanship and activities throughout active construction.",
    approach:
      "Review work on site and maintain a clear construction sequence as the project progresses.",
    gallery: [image],
  };
});

const completedProjects: Project[] = Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const image = `/images/optimized/complete-${index + 1}.webp`;
  return {
    slug: `completed-residence-${number}`,
    title: `Completed Residence ${number}`,
    category: "Residential",
    filterCategory: "Completed",
    business: "Construction",
    image,
    alt: `Completed residential construction project ${number}`,
    status: "Completed",
    overview:
      "A completed residential project delivered by Techno Vision Nirman Sewa with coordinated construction and finishing work.",
    scope: ["Residential construction", "Site coordination", "Finishing works"],
    challenge:
      "Coordinate construction activities and finishing details around the requirements of the residence.",
    approach:
      "Plan each stage carefully, coordinate the work on site and review the finished details before handover.",
    gallery: [image],
  };
});

const renovationProjects: Project[] = [1, 2].map((item) => {
  const number = String(item).padStart(2, "0");
  const image = `/images/optimized/renovation-${item}.webp`;
  return {
    slug: `renovation-project-${number}`,
    title: `Renovation Project ${number}`,
    category: "Renovation",
    filterCategory: "Renovation",
    business: "Construction",
    image,
    alt: `Renovation project ${number}`,
    status: item === 1 ? "Ongoing" : "Completed",
    overview:
      "A view of renovation and finishing work by Techno Vision Nirman Sewa.",
    scope: ["Interior renovation", "Finishing works", "Site coordination"],
    challenge:
      "Coordinate new finishes and fitted elements carefully within an existing interior.",
    approach:
      "Sequence the work around the existing space, coordinate trades and review each detail carefully.",
    gallery: [image],
  };
});

export const projects: Project[] = [
  ongoingProjects[10],
  completedProjects[0],
  completedProjects[1],
  ...ongoingProjects.slice(0, 10),
  ongoingProjects[11],
  ...completedProjects.slice(2),
  ...renovationProjects,
];
