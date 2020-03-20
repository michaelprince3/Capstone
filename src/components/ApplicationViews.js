import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import Login from "./auth/Login";
import ProjectCard from "./activeProject/ProjectCard";
import ProjectList from "./activeProject/ProjectList";
import ProjectForm from "./activeProject/ProjectForm";
import ProjectDetail from "./activeProject/ProjectDetail";

const ApplicationViews = props => {
  const setUser = props.setUser;
  const hasUser = props.hasUser;

  return (
    <>
      <Route
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/"
        render={props => {
          return <Home />;
        }}
      />
      <Route
        exact
        path="/future"
        render={props => {
          return <ProjectList {...props} />;
        }}
      />
      <Route
        exact
        path="/active"
        render={props => {
          return <ProjectList {...props} />;
        }}
      />
       <Route
        exact
        path="/complete"
        render={props => {
          return <ProjectList {...props} />;
        }}
      />
      <Route
        exact
        path="/projects/new"
        render={props => {
          return <ProjectForm {...props} />;
        }}
      />
      <Route
      exact
      path="/projects/detail"
      render={props => {
          return <ProjectDetail {...props} />;
      }}
      />
      <Route
        exact
        path="/projects/:projectId(\d+)"
        render={props => {
          return hasUser
            ? <ProjectDetail
                projectId={parseInt(props.match.params.projectId)}
                {...props}
              />
            : <Redirect to="/login" />;
        }}
      />
    </>
  );
};

export default ApplicationViews;
