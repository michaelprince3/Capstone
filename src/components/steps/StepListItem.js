import React, { useState } from "react";
import StepManager from "../../modules/StepManager";


const StepListItem = props => {
  

  const completeStep = step => {
    
    StepManager.complete(step.id, !step.isComplete).then(() => props.getProjectInfo());
  };


  return (
    <div className="projectStep" >
      <div className="projectStepContent">
        <h3>
          <span className="projectStepTitle" onClick={() => props.getTasks(props.step.id)}>{props.step.name}</span>
        </h3>
        <p>{props.step.description}</p>
        <button>Add Task</button>
        <button
        type="button"
        onClick={() => props.stepEdit(props.step.id)}>Edit</button>
        <button
        type="button"
        onClick={() => props.deleteStep(props.step.id)}>Delete</button>
        <input
            type="checkbox"
            id="isComplete"
            checked={props.step.isComplete}
            onChange={() => completeStep(props.step)}
          />
      </div>
    </div>
  );
};

export default StepListItem;