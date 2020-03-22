import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";
import ProjectManager from "../../modules/ProjectManager";


const StepEditForm = props => {
  const [step, setStep] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const stepId = props.stepId

  const handleFieldChange = evt => {
    const stateToChange = { ...step };
    stateToChange[evt.target.id] = evt.target.value;
    setStep(stateToChange);
  };

  const updateExistingStep = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const editedStep = {
      id: stepId,
      projectId: step.projectId,
      name: step.name,
      description: step.description,
      isComplete: step.isComplete,
      img: step.img
    };

    StepManager.update(editedStep).then(() =>
      ProjectManager.getWithSteps(step.projectId).then(data =>
        props.updateStepState(data.steps)
      )
    );
  };

  useEffect(() => {
      StepManager.get(stepId)
      .then(data => {
          setStep(data)
          setIsLoading(false)
      })
  }, [])

  return (
      <>
      <form>
          <fieldset>
              <label htmlFor="name">Step Name</label>
              <input
              type="text"
              required
              className="stepEditForm"
              onChange={handleFieldChange}
              id="name"
              value={step.name}
              />
              <label htmlFor="description">Step Description</label>
              <input
              type="text"
              required
              className="stepEditForm"
              onChange={handleFieldChange}
              id="description"
              value={step.description}
              />
              <div className="button">
                  <button
                  type="button"
                  disabled={isLoading}
                  onClick={updateExistingStep}
                  className="btn"
                  >Submit</button>
              </div>
          </fieldset>
      </form>
      </>
  )
};

export default StepEditForm