import React from "react";
import "./project.css";
import ProjectManager from "../../modules/ProjectManager";

const ProjectCard = props => {

  
  
  const activateProject = (id, boolean) => {
    ProjectManager.active(id, boolean);
    props.openCard()
  };
 
  return (
    <>
      <div className="projectCard" >
        <div className="projectCardContent" onClick={() => props.openCard(props.project.id)}>
          <h3>
            <span className="projectCardTitle">{props.project.name}</span>
          </h3>
          <p>{props.project.description}</p>
          <p>A pretty image</p>
        </div>
        {props.project.isActive === false &&
          <div className="btn">
            <button
              type="button"
              onClick={() => activateProject(props.project.id, true)}
            >
              Activate
            </button>
          </div>
        }
      </div>
    </>
  );
  //   } else {return(null)}
};

export default ProjectCard;
