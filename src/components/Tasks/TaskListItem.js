import React, { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskManager from "../../modules/TaskManager";

const TaskListItem = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [taskComplete, setTaskComplete] = useState(false);
  const taskId = props.task.id;
  const stepId = props.task.stepId;

  const editHandler = () => {
    {isEdit === false
    ? (setIsEdit(true))
    : (setIsEdit(false))
    }
  };

  console.log(stepId)

  const completeTask = (id, stepId) => {
    taskComplete === false ? setTaskComplete(true) : setTaskComplete(false);
    TaskManager.complete(id, taskComplete).then(() => props.getTasks(stepId));
  };

  return (
    <div className="projectTask">
      {isEdit ? (
        <div>
          <TaskEditForm taskId={taskId} editStop={editHandler} {...props} />
        </div>
      ) : (
        <div className="projectTaskContent">
          <h3>
            <span className="projecTaskTitle">{props.task.name}</span>
          </h3>
          <p>{props.task.description}</p>
          <button type="button" onClick={editHandler}>
            Edit
          </button>
          <button type="button" onClick={() => props.deleteTask(taskId)}>
            Delete
          </button>
          <input
            type="checkbox"
            id="isComplete"
            checked={props.task.isComplete}
            onChange={() => completeTask(taskId, stepId)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskListItem;
