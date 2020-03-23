import React from "react";
import "./project.css";
import ProjectManager from "../../modules/ProjectManager";

const ProjectCard = props => {
  const projectId = parseInt(props.project.id);

  //sets the project as active
  const activateProject = (id, boolean) => {
    ProjectManager.active(id, boolean);
    props.openCard(projectId);
  };

  return (
    <>
      <div className="projectCard">
        <div
          className="projectCardContent"
          onClick={() => props.openCard(projectId)}
        >
          <h3>
            <span className="projectCardTitle">{props.project.name}</span>
          </h3>
          <p>{props.project.description}</p>
          <p>A pretty image</p>
        </div>
        {props.project.isActive === false && (
          <div className="btn">
            <button
              type="button"
              onClick={() => activateProject(projectId, true)}
            >
              Activate
            </button>
          </div>
        )}
      </div>
    </>
  );
  //   } else {return(null)}
};

export default ProjectCard;
