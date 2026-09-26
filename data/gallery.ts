import { projects } from "@/data/projects";

export const gallery = projects.map((project) => ({
  src: project.image,
  alt: project.alt,
}));
