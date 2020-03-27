import React, { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskManager from "../../modules/TaskManager";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { Typography, IconButton, Tooltip, Card, CardContent, CardActions } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";

const TaskListItem = props => {
  const [isEdit, setIsEdit] = useState(false);

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
            <IconButton aria-label="edit" className="edit">
              <EditIcon fontSize="large" type="button" onClick={editHandler} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon
                fontSize="large"
                type="button"
                onClick={() => props.deleteTask(props.task.id)}
              />
            </IconButton>
          </Tooltip>
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
