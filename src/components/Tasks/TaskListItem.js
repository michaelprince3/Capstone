import React, { useState } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskManager from "../../modules/TaskManager";

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
    <div className="projectTask">
      {isEdit ? (
        <div>
          <TaskEditForm taskId={props.task.id} editStop={editHandler} {...props} />
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
          <button type="button" onClick={() => props.deleteTask(props.task.id)}>
            Delete
          </button>
          <input
            type="checkbox"
            id="isComplete"
            checked={props.task.isComplete}
            onChange={() => completeTask(props.task)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskListItem;
