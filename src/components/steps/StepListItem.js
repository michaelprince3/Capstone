import React, { useState } from "react";
import StepManager from "../../modules/StepManager";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Button as IconButton, Typography, Tooltip, Card, CardActions, CardContent, Button, DialogActions, DialogContentText, DialogContent, Dialog, DialogTitle } from "@material-ui/core";

const StepListItem = props => {
  const [stepConfirmOpen, setStepConfirmOpen] = useState(false);

  const handleStepConfirmOpen = () => {
    setStepConfirmOpen(true);
  };

  const handleStepConfirmClose = () => {
    setStepConfirmOpen(false);
  };

  const completeStep = step => {
    StepManager.complete(step.id, !step.isComplete).then(() =>
      props.getProjectInfo()
    );
  };

  return (
    <Card className="card">
      <CardContent className="projectStepContent">
        <Typography variant="h5" className="projectStepTitle">
          <span
            className="projectStepTitle"
            onClick={() => props.getTasks(props.step.id)}
          >
            {props.step.name}
          </span>
        </Typography>
        <Typography>{props.step.description}</Typography>
        </CardContent>
        <CardActions>
        <Tooltip title="Edit">
          <IconButton aria-label="edit" className="edit">
            <EditIcon
              fontSize="large"
              type="button"
              onClick={() => props.stepEdit(props.step.id)}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" className="delete">
            <DeleteIcon
              fontSize="large"
              type="button"
              onClick={() => handleStepConfirmOpen()}
            />
          </IconButton>
        </Tooltip>
        <Dialog
                  open={stepConfirmOpen}
                  onClose={() => handleStepConfirmClose()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete this Step?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This will delete this Step. Deleting this step will
                       also remove all associated Tasks.
                      Are you sure you want to continue?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleStepConfirmClose()} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={() => props.deleteStep(props.step.id)} color="primary" autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
        <Tooltip title="Complete">
          <ToggleButton
            value="check"
            selected={props.step.isComplete}
            onChange={() => {
              completeStep(props.step);
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </Tooltip>
        </CardActions>
    </Card>
  );
};

export default StepListItem;
