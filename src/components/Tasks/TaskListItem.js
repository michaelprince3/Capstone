import React, { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskManager from "../../modules/TaskManager";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import {
  Typography,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";

const TaskListItem = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [taskConfirmOpen, setTaskConfirmOpen] = useState(false);

  const handleTaskConfirmOpen = () => {
    setTaskConfirmOpen(true);
  };

  const handleTaskConfirmClose = () => {
    setTaskConfirmOpen(false);
  };

  const editHandler = () => {
    {
      isEdit === false ? setIsEdit(true) : setIsEdit(false);
    }
  };

  const completeTask = task => {
    TaskManager.complete(task.id, !task.isComplete).then(() =>
      props.getTasks(task.stepId)
    );
  };

  return (
    <>
      {isEdit ? (
        <div>
          <TaskEditForm
            taskId={props.task.id}
            editStop={editHandler}
            {...props}
          />
        </div>
      ) : (
        <Card className="card">
          <CardContent className="projectTaskContent">
            <Typography variant="h5">
              <span className="projecTaskTitle">{props.task.name}</span>
            </Typography>
            <Typography>{props.task.description}</Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="Edit">
              <IconButton aria-label="edit" onClick={editHandler}>
                <EditIcon className="edit" fontSize="large" type="button" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => handleTaskConfirmOpen()}
              >
                <DeleteIcon fontSize="large" type="button" />
              </IconButton>
              </Tooltip>
              <Dialog
                  open={taskConfirmOpen}
                  onClose={() => handleTaskConfirmClose()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete this Task?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This will delete this Task.
                      Are you sure you want to continue?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleTaskConfirmClose()} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={() => props.deleteTask(props.task.id)} color="primary" autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
            
            <Tooltip title="Complete">
              <ToggleButton
                value="check"
                selected={props.task.isComplete}
                onChange={() => completeTask(props.task)}
              >
                <CheckIcon />
              </ToggleButton>
            </Tooltip>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default TaskListItem;
