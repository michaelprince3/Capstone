import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";
import ProjectManager from "../../modules/ProjectManager";
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Button
} from "@material-ui/core";

const StepEditForm = props => {
  const [step, setStep] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const stepId = props.stepId;

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
    StepManager.get(stepId).then(data => {
      setStep(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <TextField
            required
            id="name"
            label="Step Name"
            variant="outlined"
            value={step.name}
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="description"
            label="Step Description"
            multiline
            rows="4"
            variant="outlined"
            value={step.description}
            onChange={handleFieldChange}
          />
        </CardContent>
        <CardActions className="button">
          <Button
            type="button"
            variant="contained"
            disabled={isLoading}
            onClick={updateExistingStep}
            className="btn"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default StepEditForm;
