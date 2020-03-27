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
import {
  Button,
  Typography,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

const ProjectDetail = props => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState(false);
  const [stepId, setStepId] = useState();
  const [isStepEdit, setIsStepEdit] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [isProjectEdit, setIsProjectEdit] = useState(false);
  const projectId = props.projectId;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };
  //set state to new form to load the new project form
  const newStep = () => {
    setIsNewForm(true);
  };
  //sets state to load the edit project form
  const projectEdit = () => {
    setIsProjectEdit(true);
  };
  //sets state to switch from render tasks to new task
  const newTask = () => {
    setIsNewTask(true);
    setRenderTasks(false);
  };
  //sets state to the current step ID and edit steps
  const stepEdit = id => {
    setStepId(id);
    setIsStepEdit(true);
  };
  //sets state to render tasks loads the current step ID and turns off new task form
  const showTasks = id => {
    setIsNewTask(false);
    setRenderTasks(true);
    setStepId(id);
  };
  //sets state to the new tasks after edit and reloads tasks
  const updateTasks = updatedTasks => {
    setTasks(updatedTasks);
    setRenderTasks(true);
    setIsNewTask(false);
  };
  //sets state to turn off project edit and sets the new project
  const updateProjectState = project => {
    setProject(project);
    setIsProjectEdit(false);
  };
  //sets new step state and turns off edit
  const updateStepState = step => {
    setSteps(step);
    setIsStepEdit(false);
  };
  // gets the project info from database
  const getProjectInfo = () => {
    ProjectManager.getWithSteps(projectId).then(proj => {
      setSteps(proj.steps);
      setProject({
        name: proj.name,
        description: proj.description,
        isActive: proj.isActive,
        isComplete: proj.isComplete
      });
      setIsLoading(false);
      setIsNewForm(false);
    });
  };
  //deletes a project
  const deleteProject = id => {
    ProjectManager.delete(id).then(() => props.history.push("/active"))
    handleConfirmClose()
  };
  //deletes a step
  const deleteStep = id => {
    StepManager.delete(id).then(
      () =>
        ProjectManager.getWithSteps(projectId).then(data =>
          setSteps(data.steps)
        ),
      setRenderTasks(false)
    );
  };
  //deletes a task
  const deleteTask = id => {
    TaskManager.delete(id).then(() =>
      TaskManager.getWithTasks(stepId).then(data => setTasks(data.tasks))
    );
  };
  //sets project as complete
  const completeProject = (id, boolean) => {
    ProjectManager.complete(id, boolean).then(() =>
      props.history.push("/active")
    );
  };
  //get tasks from database
  const getTasks = stepId => {
    StepManager.getWithTasks(stepId)
      .then(data => {
        setTasks(data.tasks);
      })
      .then(() => showTasks(stepId));
  };

  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <>
      <div className="detailCardContainer">
        <div className="detailCards">
          {isProjectEdit ? (
            <div className="projectEdit">
              <ProjectEdit updateProjectState={updateProjectState} {...props} />
            </div>
          ) : (
            <Card className="card">
              <CardContent>
                <Typography variant="h5">
                  Name: <span>{project.name}</span>
                </Typography>
                <Typography>{project.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  type="button"
                  className="btn"
                  onClick={projectEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  className="btn"
                  onClick={() => handleConfirmOpen()}
                >
                  Delete
                </Button>
                <Dialog
                  open={confirmOpen}
                  onClose={() => handleConfirmClose()}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete your project?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This will delete the entire project. All Steps and tasks 
                      related to this project will be lost.
                      Are you sure you want to continue?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                      Disagree
                    </Button>
                    <Button onClick={() => deleteProject(projectId)} color="primary" autoFocus>
                      Agree
                    </Button>
                  </DialogActions>
                </Dialog>
                {project.isComplete === false && project.isActive === true ? (
                  <Tooltip title="Complete">
                    <Button
                      variant="contained"
                      type="button"
                      onClick={() => completeProject(projectId, true)}
                    >
                      Complete
                    </Button>
                  </Tooltip>
                ) : null}
              </CardActions>
            </Card>
          )}
        </div>
        <div className="detailCards">
          {isStepEdit ? (
            <StepEditForm
              updateStepState={updateStepState}
              stepId={stepId}
              {...props}
            />
          ) : isNewForm ? (
            <div className="stepForm">
              <StepNewForm
                stepId={stepId}
                getProjectInfo={getProjectInfo}
                {...props}
              />
            </div>
          ) : (
            <div className="stepList">
              {steps.map(step => (
                <StepListItem
                  key={step.id}
                  step={step}
                  getProjectInfo={getProjectInfo}
                  getTasks={getTasks}
                  deleteStep={deleteStep}
                  stepEdit={stepEdit}
                  {...props}
                />
              ))}
              <Button
                variant="contained"
                type="button"
                className="btn"
                onClick={newStep}
              >
                Add
              </Button>
            </div>
          )}
        </div>
        <div className="detailCards">
          {renderTasks && stepId !== "" ? (
            <div className="taskList">
              {tasks.map(task => (
                <TaskListItem
                  key={task.id}
                  updateTasks={updateTasks}
                  getTasks={getTasks}
                  task={task}
                  deleteTask={deleteTask}
                  {...props}
                />
              ))}
              <Button variant="contained" type="button" onClick={newTask}>
                Add
              </Button>
            </div>
          ) : isNewTask ? (
            <TaskNewForm
              key={stepId}
              stepId={stepId}
              getTasks={getTasks}
              {...props}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
