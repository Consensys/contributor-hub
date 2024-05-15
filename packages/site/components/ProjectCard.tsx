type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  visibility: "public" | "private";
};

export const ProjectCard = async () => {
  const res = await fetch(`https://contributor-hub.onrender.com/admin/repos`);
  const projectData = (await res.json()) as Project[];

  return projectData.map((project) => {
    return (
      <a
        className="flex hover:bg-gray-50 bg-white shadow-lg py-4 px-4 md:px-20 w-full justify-between rounded-lg duration-150"
        target="_blank"
        href={project.url}
        key={project.id}
      >
        <div>
          <h1 className="capitalize font-bold">{project.name}</h1>
          <p>{project.description ?? ""}</p>
        </div>
        <div className="space-x-4">
          <span>
            <span className="text-black text-opacity-50">Stars:</span> {project.stars}
          </span>
          <span>
            <span className="text-black text-opacity-50">Forks:</span> {project.forks}
          </span>
          <span>
            <span className="text-black text-opacity-50">Issues:</span> {project.issues}
          </span>
        </div>
      </a>
    );
  });
};
