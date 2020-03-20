import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import "./ProjectDetail.css";
import StepListItem from "../steps/StepListItem";
import StepNewForm from "../steps/StepNewForm";
import StepManager from "../../modules/StepManager";

const ProjectDetail = props => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState(false);
  const [stepId, setStepId] = useState();
  const projectId = props.projectId;

  const newStep = () => {
    setIsNewForm(true);
  };

  const showTasks = id => {
    setRenderTasks(true);
    setStepId(id);
  };

  useEffect(() => {
    ProjectManager.getWithSteps(projectId).then(proj => {
      setSteps(proj.steps);
      setProject({
        name: proj.name,
        description: proj.description
      });

      setIsLoading(false);
    });
  }, [props.projectId]);

  // StepManager.getWithTasks(stepId).then(step => {
  //   setTasks(step.tasks);
  // });
  return (
    <>
      <div className="detailCardContainer">
        <div className="detailCards">
          <h3>
            Name: <span>{project.name}</span>
          </h3>
          <p>{project.description}</p>
          <button type="button" className="btn">
            Edit
          </button>
          <button type="button" className="btn">
            Delete
          </button>
        </div>
        <div className="detailCards">
          {isNewForm ? (
            <div className="stepForm">
              <StepNewForm {...props} />;
            </div>
          ) : (
            <div className="stepList">
              {steps.map(step => (
                <StepListItem
                  key={project.id}
                  step={step}
                  showTasks={showTasks}
                  {...props}
                />
              ))}
              <button type="button" className="btn" onClick={newStep}>
                Add
              </button>
            </div>
          )}
        </div>
        <div className="detailCards">
          {renderTasks ? (
            <StepListItem key={stepId} tasks={tasks} {...props} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
