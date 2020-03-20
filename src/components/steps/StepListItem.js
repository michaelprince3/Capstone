import React from "react";
// import "./project.css";

const StepListItem = props => {

  const openTasks = () => {
    props.history.push(`/projects/${props.step.id}`);
  };

  return (
    <div className="projectStep" onClick={openTasks(props.step.id)}>
      <div className="projectStepContent">
        <h3>
          <span className="projectStepTitle" onClick={props.showTasks}>{props.step.name}</span>
        </h3>
        <p>{props.step.description}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default StepListItem;