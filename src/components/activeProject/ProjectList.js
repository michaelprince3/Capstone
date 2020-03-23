import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

const ProjectList = props => {
  const [projects, setProjects] = useState([]);
  const [isNew, setIsNew] = useState(false);
  //open project detail
  const openCard = id => {
    props.history.push(`/projects/${id}`);
  };
  // toggle the new project form
  const toggleNew = () => {
    isNew === false ? setIsNew(true) : setIsNew(false);
  };
  //get projects from database and filter them by future, active, complete

  const getProjects = () => {
    const activeUserId = sessionStorage.getItem("id");
    return ProjectManager.getAll(activeUserId).then(projects => {
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
          <ProjectForm
            openCard={openCard}
            toggleNew={toggleNew}
            getProjects={getProjects}
            {...props}
          />
        </div>
      ) : (
        <div className="cards">
          <section className="projectSection">
            <button type="button" className="btn" onClick={toggleNew}>
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
