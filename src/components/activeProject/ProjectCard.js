import React from "react";
import "./project.css"


const ProjectCard = props => {
//   if (props.task.isComplete === false) {

const openCard = () => {
  alert("This should open the detail")
}
  return (
    <div className="projectCard" onClick={openCard}>
      <div className="projectCardContent">
        <h3>
          <span className="projectCardTitle">You Can't edit this!!!!</span>
        </h3>
        <p>Stop it!!!!</p>
        <p>Complete By: {}</p>
       
        {/* <button
          type="button"
          onClick={() => props.history.push(`tasks/${props.task.id}/edit`)}
        >
          Edit
        </button> */}
        {/* <button type="button" onClick={() => props.deleteTask(props.task.id)}>
          Delete
        </button> */}
        {/* <input
        type="checkbox"
        id="isComplete"
        checked={props.task.isComplete}
        onChange={() => props.completeTask(props.task.id)}/>
        <label
        htmlFor="isComplete">Complete</label> */}
        {/* <button
          type="button"
          onClick={() => props.history.push(`tasks/${props.task.id}/edit`)}
        >
          Edit
        </button>
        <button type="button" onClick={() => props.deleteTask(props.task.id)}>
          Delete
        </button> */}
      </div>
    </div>
  );
//   } else {return(null)}
};

export default ProjectCard;