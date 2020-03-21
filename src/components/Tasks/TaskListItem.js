import React from "react";
// import "./project.css";

const TaskListItem = props => {
  return (
    <div className="projectTask">
      <div className="projectTaskContent">
        <h3>
          <span className="projecTaskTitle">{props.task.name}</span>
        </h3>
        <p>{props.task.description}</p>
        <button>Edit</button>
        <button type="button" onClick={() => props.deleteTask(props.task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskListItem;
