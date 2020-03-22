import React from "react";


const StepListItem = props => {

  return (
    <div className="projectStep" >
      <div className="projectStepContent">
        <h3>
          <span className="projectStepTitle" onClick={() => props.showTasks(props.step.id)}>{props.step.name}</span>
        </h3>
        <p>{props.step.description}</p>
        <button>Add Task</button>
        <button
        type="button"
        onClick={() => props.stepEdit(props.step.id)}>Edit</button>
        <button
        type="button"
        onClick={() => props.deleteStep(props.step.id)}>Delete</button>
      </div>
    </div>
  );
};

export default StepListItem;