import React, { useState } from "react";
import ProjectManager from "../../modules/ProjectManager";
import firebase from "firebase/app";
import "firebase/storage";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Modal,
  Card,
  TextField,
  CardContent,
  CardActions
} from "@material-ui/core";

const ProjectForm = props => {
  const userId = sessionStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [project, setProject] = useState({
    userId: parseInt(userId),
    name: "",
    description: "",
    isActive: false,
    isComplete: false,
    img: ""
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...project };
    stateToChange[evt.target.id] = evt.target.value;
    setProject(stateToChange);
  };

  const uploadFirebase = () => {
    const imagesRef = firebase.storage().ref("images");
    const childRef = imagesRef.child(`${project.name}-${Date.now()}`);
    childRef.put(project.img);
    console
      .log(project)
      // step 2: get url from firebase
      .then(response => response.ref.getDownloadURL())
      .then(url => {
        setProject({ img: url });
      })
      .then(() => {});
  };

  const constructNewProject = evt => {
    evt.preventDefault();
    if (project.name === "" || project.description === "") {
      window.alert("Please input all fields");
    } else {
      setIsLoading(true);
      ProjectManager.post(project).then(() => {
        props.toggleNew();
        props.getProjects();
      });
    }
  };

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      },
      maxWidth: 400,
      margin: 40
    },

    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  }));

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <input
        id="img"
        type="file"
        label="Project Photo"
        onChange={uploadFirebase}
      />
    </div>
  );

  return (
    <>
      <Card className={classes.root}>
        <div>
          <div>
            <CardContent className="projectForm">
              <TextField
                required
                id="name"
                label="Project Name"
                variant="outlined"
                onChange={handleFieldChange}
              />
              <TextField
                required
                id="description"
                label="Project Description"
                multiline
                rows="4"
                variant="outlined"
                onChange={handleFieldChange}
              />

              <Button type="button" variant="contained" onClick={handleOpen}>
                Upload Image
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </CardContent>
            <CardActions className="projectFormBtn">
              <Button
                type="button"
                variant="contained"
                disabled={isLoading}
                onClick={constructNewProject}
              >
                Submit
              </Button>
            </CardActions>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProjectForm;
