import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

const ProjectList = props => {
  const [projects, setProjects] = useState([]);
  const [isNew, setIsNew] = useState(false);

  const openCard = () => {
    props.history.push(`/projects/${props.project.id}`);
  };

  const makeNew = () => {
    setIsNew(true);
  };

  const makeNotNew = () => {
    setIsNew(false)
  }

  const getProjects = () => {
    return ProjectManager.getAll().then(projects => {
      let filteredProjects = [];
      if (props.location.pathname === "/future") {
        filteredProjects = projects.filter(
          project => project.isActive === false
        );
        setProjects(filteredProjects);
      } else if (props.location.pathname === "/active") {
        filteredProjects = projects.filter(
          project => project.isActive === true && project.isComplete === false
        );
        setProjects(filteredProjects);
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
      {isNew ? (
        <div>
          <ProjectForm openCard={openCard} makeNotNew={makeNotNew} {...props} />
        </div>
      ) : (
        <div className="cards">
          <section className="projectSection">
            <button type="button" className="btn" onClick={makeNew}>
              New Project
            </button>
          </section>
          <div className="cardContainer">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                openCard={openCard}
                {...props}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
