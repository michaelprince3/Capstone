import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./project.css";
import ProjectManager from "../../modules/ProjectManager";


const ProjectCard = props => {
  const projectId = parseInt(props.project.id);

  //sets the project as active
  const activateProject = (id, boolean) => {
    ProjectManager.active(id, boolean);
    props.openCard(projectId);
  };

  return (
    <>
      <Card boxShadow={5} className="projectCard">
        <CardContent
          className="projectCardContent"
          onClick={() => props.openCard(projectId)}
        >
          <Typography variant="h5" className="title">
            <span className="projectCardTitle">{props.project.name}</span>
          </Typography>
          <p>{props.project.description}</p>
          <p>A pretty image</p>
        </CardContent>
        {props.project.isActive === false && (
          <CardActions className="btn">
            <Button
              variant="contained"
              type="button"
              onClick={() => activateProject(projectId, true)}
            >
              Activate
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
  //   } else {return(null)}
};

export default ProjectCard;
