export type Service = {
  title: string;
  description: string;
  icon: "plan" | "structure" | "survey" | "build";
};
export const consultancyServices: Service[] = [
  {
    title: "Architectural Planning & Design",
    description:
      "Spaces planned around people, purpose and the possibilities of the site.",
    icon: "plan",
  },
  {
    title: "Structural Design",
    description:
      "Structural planning and analysis coordinated with the architectural intent.",
    icon: "structure",
  },
  {
    title: "Surveying",
    description:
      "Site measurements and information to establish a reliable project foundation.",
    icon: "survey",
  },
  {
    title: "Estimation & Costing",
    description:
      "Quantity assessment and cost planning to support informed decisions.",
    icon: "plan",
  },
  {
    title: "Valuation",
    description:
      "Professional assessment of property and project value based on available information and requirements.",
    icon: "plan",
  },
  {
    title: "DPR Preparation",
    description:
      "Detailed project reports bringing technical scope, feasibility and planning together.",
    icon: "plan",
  },
  {
    title: "Engineering Consultation",
    description:
      "Practical technical guidance shaped around your project requirements.",
    icon: "structure",
  },
  {
    title: "Project Planning",
    description:
      "Coordinating scope, priorities and the sequence of work before execution.",
    icon: "survey",
  },
  {
    title: "Construction Supervision",
    description:
      "Site oversight and coordination to help align execution with approved designs.",
    icon: "build",
  },
];
export const constructionServices: Service[] = [
  {
    title: "Residential Construction",
    description: "Careful execution of homes designed for everyday living.",
    icon: "build",
  },
  {
    title: "Commercial Construction",
    description:
      "Coordinated delivery of spaces for business and professional use.",
    icon: "structure",
  },
  {
    title: "Building Construction",
    description:
      "Building works coordinated from site preparation through finishing.",
    icon: "build",
  },
  {
    title: "Civil Works",
    description:
      "Practical execution of site development and supporting civil works.",
    icon: "survey",
  },
  {
    title: "Infrastructure Development",
    description:
      "Construction support for essential infrastructure and community spaces.",
    icon: "structure",
  },
  {
    title: "Renovation",
    description:
      "Thoughtful upgrades that respond to the conditions of existing buildings.",
    icon: "plan",
  },
  {
    title: "Interior & Finishing",
    description:
      "Finishing work that brings design intent into the details of a space.",
    icon: "plan",
  },
  {
    title: "Electrical & Plumbing",
    description:
      "Coordination and installation of essential building services.",
    icon: "structure",
  },
  {
    title: "Project Execution",
    description:
      "Bringing site activities, resources and project requirements together.",
    icon: "build",
  },
  {
    title: "Construction Materials",
    description:
      "Construction materials supplied as a service activity in response to project requirements.",
    icon: "build",
  },
];
export const enquiryServices = [
  "Engineering Consultancy",
  "Architectural Design",
  "Structural Design",
  "Survey / Estimation",
  "Project Supervision",
  "Construction",
  "Renovation",
  "Other",
];
