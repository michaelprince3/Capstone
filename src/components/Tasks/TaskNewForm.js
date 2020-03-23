import React, { useState } from "react";
import TaskManager from "../../modules/TaskManager";
import StepManager from "../../modules/StepManager";

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
      TaskManager.post(task)
      props.getTasks(stepId)
        // .then(() => StepManager.getWithTasks(stepId))
        // .then(results => {
        //   props.setTasks(results.tasks);
        //   props.updateTasks(tasks)
        // });
    }
  };

  return (
    <>
      <form>
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
      </form>
    </>
  );
};

export default TaskNewForm;
