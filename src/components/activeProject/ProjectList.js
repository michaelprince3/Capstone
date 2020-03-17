import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import ProjectCard from "./ProjectCard";

const ProjectList = props => {
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    return ProjectManager.getAll().then(projectsFromAPI => {
      setProjects(projectsFromAPI);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
      <>
        <section className="projectSection">
            <button
            type="button"
            className="btn"
            onClick={() => {
                props.history.push("/projects/new")
            }}>New Project</button>
        </section>
        <div className="cardContainer">
            {projects.map(project => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    {...props}
                    />
            ))}
        </div>
      </>
  )
};

export default ProjectList