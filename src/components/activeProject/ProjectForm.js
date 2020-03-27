import React, { useState } from "react";
import ProjectManager from "../../modules/ProjectManager";
import * as firebase from "firebase/app";
import "firebase/storage";

const ProjectForm = props => {
  const userId = sessionStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(false);

  const [project, setProject] = useState({
    userId: parseInt(userId),
    name: "",
    description: "",
    isActive: false,
    isComplete: false,
    img: null
  });

  submitForm = () => {
    // step 1: save Image to Firebase
    const imagesRef = firebase.storage().ref("images");
    const childRef = imagesRef.child(`${this.state.username}-${Date.now()}`);
    childRef
      .put(this.state.photo)
      // step 2: get url from firebase
      .then(response => response.ref.getDownloadURL())
      // step 3: save everything to json server
      .then(url => {
        return saveProfile({
          username: this.state.username,
          about: this.state.about,
          photoUrl: url
        });
      })
      .then(() => this.props.history.push("/"));
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...project };
    stateToChange[evt.target.id] = evt.target.value;
    setProject(stateToChange);
  };

  const constructNewProject = evt => {
    const imagesRef = firebase.storage().ref("images");
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
