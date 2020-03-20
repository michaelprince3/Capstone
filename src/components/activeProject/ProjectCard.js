import React from "react";
import "./project.css";

const ProjectCard = props => {
  //   if (props.task.isComplete === false) {

  const openCard = () => {
    props.history.push(`/projects/${props.project.id}`);
  };
  return (
    <div className="projectCard" onClick={openCard}>
      <div className="projectCardContent">
        <h3>
          <span className="projectCardTitle">{props.project.name}</span>
        </h3>
        <p>{props.project.description}</p>
        <p>A pretty image</p>
      </div>
    </div>
  );
  //   } else {return(null)}
};

export default ProjectCard;
