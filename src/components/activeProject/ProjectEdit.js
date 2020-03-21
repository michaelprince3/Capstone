import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";

const ProjectEdit = props => {
  const [project, setProject] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...project };
    stateToChange[evt.target.id] = evt.target.value;
    setProject(stateToChange);
  };

  const updateExistingProject = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const editedProject = {
      id: props.match.params.projectId,
      userId: project.userId,
      name: project.name,
      description: project.description,
      isActive: project.isActive,
      isComplete: project.isComplete,
      img: project.img
    };

    ProjectManager.update(editedProject).then(() =>
      ProjectManager.get(props.match.params.projectId).then(data =>
        props.updateProjectState(data)
      )
    );
  };

  useEffect(() => {
      ProjectManager.get(props.match.params.projectId)
      .then(project => {
          setProject(project)
          setIsLoading(false)
      })
  }, [])

  return (
      <>
      <form>
          <fieldset>
              <label htmlFor="name">Project Name</label>
              <input
              type="text"
              required
              className="projectEditForm"
              onChange={handleFieldChange}
              id="name"
              value={project.name}
              />
              <label htmlFor="description">Project Description</label>
              <input
              type="text"
              required
              className="projectEditForm"
              onChange={handleFieldChange}
              id="description"
              value={project.description}
              />
              <div className="button">
                  <button
                  type="button"
                  disabled={isLoading}
                  onClick={updateExistingProject}
                  className="btn"
                  >Submit</button>
              </div>
          </fieldset>
      </form>
      </>
  )
};

export default ProjectEdit