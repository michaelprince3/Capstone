import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import ProjectCard from "./ProjectCard";

const ProjectList = props => {
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    return ProjectManager.getAll().then(projects => {
      let filteredProjects = [];
      if (props.location.pathname === "/future") {
        filteredProjects = projects.filter(
          project => project.isActive === false
        );
        setProjects(filteredProjects);
        console.log("future");
      } else if (props.location.pathname === "/active") {
        filteredProjects = projects.filter(
          project => project.isActive === true && project.isComplete === false
        );
        setProjects(filteredProjects);
        console.log("active");
      } else {
        filteredProjects = projects.filter(
          project => project.isComplete === true
        );
        setProjects(filteredProjects);
      }
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
            props.history.push("/projects/new");
          }}
        >
          New Project
        </button>
      </section>
      <div className="cardContainer">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} {...props} />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
