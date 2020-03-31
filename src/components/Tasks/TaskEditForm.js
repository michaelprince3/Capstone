import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";
import TaskManager from "../../modules/TaskManager";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button
} from "@material-ui/core";

const TaskEditForm = props => {
  const [task, setTask] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const taskId = props.taskId;

  const handleFieldChange = evt => {
    const stateToChange = { ...task };
    stateToChange[evt.target.id] = evt.target.value;
    setTask(stateToChange);
  };

  const updateExistingTask = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const editedTask = {
      id: taskId,
      stepId: task.stepId,
      name: task.name,
      description: task.description,
      isComplete: task.isComplete,
      img: task.img
    };

    TaskManager.update(editedTask).then(() =>
      StepManager.getWithTasks(task.stepId).then(data =>
        props.updateTasks(data.tasks)
      )
    );
    props.editStop();
  };

  useEffect(() => {
    TaskManager.get(taskId).then(data => {
      setTask(data);
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
            label="Task Name"
            variant="outlined"
            value={task.name}
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="description"
            label="Task Description"
            multiline
            rows="4"
            variant="outlined"
            value={task.description}
            onChange={handleFieldChange}
          />
        </CardContent>
        <CardActions className="button">
          <Button
            type="button"
            variant="contained"
            disabled={isLoading}
            onClick={updateExistingTask}
            className="btn"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TaskEditForm;
