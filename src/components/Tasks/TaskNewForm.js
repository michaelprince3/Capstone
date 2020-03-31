import React, { useState } from "react";
import TaskManager from "../../modules/TaskManager";
import StepManager from "../../modules/StepManager";
import { Card, CardContent, CardActions, TextField, Button, Typography } from "@material-ui/core";

const TaskNewForm = props => {
  const projectId = props.projectId;
  const stepId = props.stepId;
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({
    stepId: parseInt(stepId),
    name: "",
    description: "",
    isComplete: false,
    img: "url"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...task };
    stateToChange[evt.target.id] = evt.target.value;
    setTask(stateToChange);
  };

  const constructNewTask = evt => {
    evt.preventDefault();
    if (task.name === "" || task.description === "") {
      window.alert("Please input all fields");
    } else {
      setIsLoading(true);
      TaskManager.post(task).then(() => props.getTasks(stepId))
      
        // .then(() => StepManager.getWithTasks(stepId))
        // .then(results => {
        //   props.setTasks(results.tasks);
        //   props.updateTasks(tasks)
        // });
    }
  };

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h5" id="title">Add a new Task</Typography>
        <TextField
        required
        id="name"
        label="Task Name"
        variant="outlined"
        onChange={handleFieldChange}
        />
        <TextField
        required
        id="description"
        label="Task Description"
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
        onClick={constructNewTask}
        >Submit</Button>
      </CardActions>
    </Card>
      {/* <form>
        <fieldset>
          <div className="taskForm">
            <label htmlFor="name">Task Name: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Task Name"
            />
            <label htmlFor="description">Task Description: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="description"
              placeholder="Task Description"
            />
          </div>
          <div className="taskFormBtn">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewTask}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form> */}
    </>
  );
};

export default TaskNewForm;
