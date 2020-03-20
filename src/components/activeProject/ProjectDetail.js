import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import "./ProjectDetail.css";
import StepListItem from "../steps/StepListItem";
import StepNewForm from "../steps/StepNewForm";
import TaskListItem from "../Tasks/TaskListItem";
import StepManager from "../../modules/StepManager";
import TaskNewForm from "../Tasks/TaskNewForm";

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
    getTasks(id);
  };

  const updateTasks = updatedTasks => {
    setTasks([]);
    setTasks(updatedTasks);
  };

  const getProjectInfo = () => {
    ProjectManager.getWithSteps(projectId).then(proj => {
      setSteps(proj.steps);
      setProject({
        name: proj.name,
        description: proj.description
      });
      setIsLoading(false);
    });
  };

  const getTasks = stepId => {
      setTasks([])
    StepManager.getWithTasks(stepId).then(data => {
      setTasks(data.tasks);
    });
  };
  useEffect(() => {
    getProjectInfo();
  }, []);

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
            <div className="taskList">
              {tasks.map(task => (
                <TaskListItem key={stepId} task={task} {...props} />
              ))}
              <TaskNewForm
                key={stepId}
                stepId={stepId}
                updateTasks={updateTasks}
                {...props}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
