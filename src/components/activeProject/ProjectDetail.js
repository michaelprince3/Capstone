import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import "./ProjectDetail.css";
import StepListItem from "../steps/StepListItem";
import StepNewForm from "../steps/StepNewForm";
import TaskListItem from "../Tasks/TaskListItem";
import StepManager from "../../modules/StepManager";
import TaskNewForm from "../Tasks/TaskNewForm";
import TaskManager from "../../modules/TaskManager";
import ProjectEdit from "./ProjectEdit";
import StepEditForm from "../steps/StepEditForm";

const ProjectDetail = props => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState(false);
  const [stepId, setStepId] = useState();
  const [isStepEdit, setIsStepEdit] = useState(false);
  const projectId = props.projectId;

  const newStep = () => {
    setIsNewForm(true);
  };

  const stepEdit = id => {
    setStepId(id);
    setIsStepEdit(true);
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

  const updateProjectState = project => {
    setProject(project);
  };

  const updateStepState = step => {
    setSteps(step);
    setIsStepEdit(false)
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

  const deleteProject = id => {
    ProjectManager.delete(id).then(() => props.history.push("/active"));
  };

  const deleteStep = id => {
    StepManager.delete(id).then(() =>
      ProjectManager.getWithSteps(projectId).then(data => setSteps(data.steps))
    );
  };

  const deleteTask = id => {
    TaskManager.delete(id).then(() =>
      TaskManager.getWithTasks(stepId).then(data => setTasks(data.tasks))
    );
  };

  const getTasks = stepId => {
    setTasks([]);
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
          <div className="ProjectDetails">
            <h3>
              Name: <span>{project.name}</span>
            </h3>
            <p>{project.description}</p>
            <button type="button" className="btn">
              Edit
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => deleteProject(projectId)}
            >
              Delete
            </button>
          </div>
          <div className="projectEdit">
            <ProjectEdit updateProjectState={updateProjectState} {...props} />
          </div>
        </div>
        <div className="detailCards">
          {isStepEdit ? (
            <StepEditForm updateStepState={updateStepState} stepId={stepId} {...props} />
          ) : isNewForm ? (
            <div className="stepForm">
              <StepNewForm {...props} />
            </div>
          ) : (
            <div className="stepList">
              {steps.map(step => (
                <StepListItem
                  key={step.id}
                  step={step}
                  showTasks={showTasks}
                  deleteStep={deleteStep}
                  stepEdit={stepEdit}
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
                <TaskListItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  {...props}
                />
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
