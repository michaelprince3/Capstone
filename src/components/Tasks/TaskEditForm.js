import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";
import TaskManager from "../../modules/TaskManager";

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
    props.editStop()
  };

  useEffect(() => {
    TaskManager.get(taskId).then(data => {
      setTask(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            required
            className="taskEditForm"
            onChange={handleFieldChange}
            id="name"
            value={task.name}
          />
          <label htmlFor="description">Task Description</label>
          <input
            type="text"
            required
            className="taskEditForm"
            onChange={handleFieldChange}
            id="description"
            value={task.description}
          />
          <div className="button">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingTask}
              className="btn"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default TaskEditForm;
