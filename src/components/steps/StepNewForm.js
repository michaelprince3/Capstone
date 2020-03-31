import React, { useState } from "react";
import StepManager from "../../modules/StepManager";
import { Card, CardActions, CardContent, Typography, Button, TextField } from "@material-ui/core";

const StepNewForm = props => {
  const projectId = props.projectId
  const [step, setStep] = useState({
    projectId: parseInt(projectId),
    name: "",
    description: "",
    isComplete: false,
    img: "url"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...step };
    stateToChange[evt.target.id] = evt.target.value;
    setStep(stateToChange);
  };

  const constructNewStep = evt => {
    evt.preventDefault();
    if (step.name === "" || step.description === "") {
      window.alert("Please input all fields");
    } else {
      setIsLoading(true);
      StepManager.post(step).then(() => props.getProjectInfo());
    }
  };

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h5" id="title">Add a new Step</Typography>
        <TextField
        required
        id="name"
        label="Step Name"
        variant="outlined"
        onChange={handleFieldChange}
        />
        <TextField
        required
        id="description"
        label="Step Description"
        multiline
        rows="4"
        variant="outlined"
        onChange={handleFieldChange}
        />
      </CardContent>
      <CardActions>
        <Button
        type="button"
        disabled={isLoading}
        onClick={constructNewStep}
        >Submit</Button>
      </CardActions>
    </Card>
      {/* <form>
        <fieldset>
          <div className="stepForm">
            <label htmlFor="name">Step Name: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Step Name"
            />
            <label htmlFor="description">Step Description: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="description"
              placeholder="Step Description"
            />
          </div>
          <div className="stepFormBtn">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewStep}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form> */}
    </>
  );
};

export default StepNewForm;