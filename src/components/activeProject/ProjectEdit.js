import React, { useState, useEffect } from "react";
import ProjectManager from "../../modules/ProjectManager";
import { TextField, Card, Button, CardContent, CardActions } from "@material-ui/core";

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
    ProjectManager.get(props.match.params.projectId).then(project => {
      setProject(project);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <TextField
            required
            id="name"
            label="Project Name"
            variant="outlined"
            value={project.name}
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="description"
            label="Project Description"
            multiline
            rows="4"
            variant="outlined"
            value={project.description}
            onChange={handleFieldChange}
          />
        </CardContent>
        <CardActions className="button">
          <Button
            type="button"
            variant="contained"
            disabled={isLoading}
            onClick={updateExistingProject}
            className="btn"
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectEdit;
