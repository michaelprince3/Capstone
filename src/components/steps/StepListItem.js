import React from "react";
// import "./project.css";

const StepListItem = props => {

  const openTasks = () => {
    props.history.push(`/projects/${props.step.id}`);
  };

  return (
    <div className="projectStep" onClick={openTasks}>
      <div className="projectStepContent">
        <h3>
          <span className="projectStepTitle">{props.step.name}</span>
        </h3>
        <p>{props.step.description}</p>
        <p>A pretty image</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default StepListItem;