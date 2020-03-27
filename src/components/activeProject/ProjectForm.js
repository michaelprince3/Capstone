import React, { useState } from "react";
import ProjectManager from "../../modules/ProjectManager";

const ProjectForm = props => {
  const userId = sessionStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(false);
  
  const [project, setProject] = useState({
    userId: parseInt(userId),
    name: "",
    description: "",
    isActive: false,
    isComplete: false,
    img: "url"
  });
  
  
  

  const handleFieldChange = evt => {
    const stateToChange = { ...project };
    stateToChange[evt.target.id] = evt.target.value;
    setProject(stateToChange);
  };

  const constructNewProject = evt => {
    evt.preventDefault();
    if (project.name === "" || project.description === "") {
      window.alert("Please input all fields");
    } else {
      setIsLoading(true);
      ProjectManager.post(project).then(() => {
      props.toggleNew()
      props.getProjects()
      })
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div className="projectForm">
            <label htmlFor="name">Project Name: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Project Name"
            />
            <label htmlFor="description">Project Description: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="description"
              placeholder="Project Description"
            />
          </div>
          <div className="projectFormBtn">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewProject}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ProjectForm;
