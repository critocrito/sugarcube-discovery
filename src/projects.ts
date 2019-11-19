import {Project} from "./types";

type ProjectStorage = {
  projects: Project[] | any;
};

const fetchProjects = async (): Promise<Project[]> => {
  const {projects}: ProjectStorage = await browser.storage.local.get(
    "projects",
  );
  if (Array.isArray(projects)) return projects;
  return [] as Project[];
};

const storeProjects = async (projects: Project[]): Promise<void> => {
  // casting to any was the only I found to make the types check.
  await browser.storage.local.set({projects: projects as any});
};

export const empty = () => ({
  id: "",
  name: "",
  endpoint: "",
  apiKey: "",
});

export const concat = async (project: Project): Promise<void> => {
  const projects = await fetchProjects();
  await storeProjects(projects.concat(project));
};

export const list = async (): Promise<Project[]> => {
  const projects = await fetchProjects();
  return projects;
};

export const remove = async (id: string): Promise<void> => {
  const projects = await fetchProjects();
  await storeProjects(projects.filter((p: Project) => p.id !== id));
};

export const update = async (id: string, project: Project): Promise<void> => {
  const projects = await fetchProjects();
  const idx = projects.findIndex((p) => p.id === id);
  await storeProjects(
    idx === -1
      ? projects.concat([project])
      : projects
          .slice(0, idx)
          .concat([project])
          .concat(projects.slice(idx + 1)),
  );
};
