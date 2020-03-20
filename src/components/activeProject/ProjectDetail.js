import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import "./ProjectDetail.css";
import StepListItem from "../steps/StepListItem";
import StepNewForm from "../steps/StepNewForm";

const ProjectDetail = props => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [steps, setSteps] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const projectId = props.projectId;

  const newStep = () => {
    setIsNewForm(true);
  };

  useEffect(() => {
    ProjectManager.getWithSteps(props.projectId).then(proj => {
      setSteps(proj.steps);
      setProject({
        name: proj.name,
        description: proj.description
      });
      setIsLoading(false);
    });
  }, [props.projectId]);

  return (
    <>
      <div className="detailCardContainer">
        <div className="detailCards">
          <h3>
            Name: <span>{project.name}</span>
          </h3>
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
                <StepListItem key={project.id} step={step} {...props} />
              ))}
              <button type="button" className="btn" onClick={newStep}>
                Add
              </button>
            </div>
          )}
        </div>
        <div className="detailCards"></div>
      </div>
    </>
  );
};

export default ProjectDetail;
