import React, { useState } from "react";
import TaskEditForm from "./TaskEditForm";

const TaskListItem = props => {
  const [isEdit, setIsEdit] = useState(false);
  const taskId = props.task.id;

  const editHandler = () => {
    setIsEdit(true);
  };

  const editStop = () => {
    setIsEdit(false);
  };

  return (
    <div className="projectTask">
      {isEdit ? (
        <div>
          <TaskEditForm taskId={taskId} editStop={editStop} {...props} />
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
        </div>
      )}
    </div>
  );
};

export default TaskListItem;
