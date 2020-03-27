import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {
  Typography,
  AppBar,
  Link as Button
} from "@material-ui/core";



const size="h4"

const NavBar = props => {
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };

 

  return (
    <header>
      <Typography variant="h3" className="title">
        Projectile
      </Typography>
      <AppBar  position="static" className="navBar">
        <div className="container">
          <Button
            color="textPrimary"
            component={Link}
            className="navBtn"
            to="/"
          >
            <Typography variant={size}>Home</Typography>
          </Button>

          {props.hasUser ? (
            <Button
              
              color="textPrimary"
              component={Link}
              className="navBtn"
              to="/future"
            >
              <Typography variant={size}>

              Future
              </Typography>
            </Button>
          ) : null}
          {props.hasUser ? (
            <Button
              color="textPrimary"
              component={Link}
              className="navBtn"
              to="/active"
            >
              <Typography variant={size}>

              Active
              </Typography>
            </Button>
          ) : null}
          {props.hasUser ? (
            <Button
              color="textPrimary"
              component={Link}
              className="navBtn"
              to="/complete"
            >
              <Typography variant={size}>

              Completed
              </Typography>
            </Button>
          ) : null}
          {props.hasUser ? (
            <Button
              color="textPrimary"
              component={Link}
              className="navBtn"
              to="/"
              onClick={handleLogout}
            >
              <Typography variant={size}>

              Logout
              </Typography>
            </Button>
          ) : (
            <Button
              color="textPrimary"
              component={Link}
              className="navBtn"
              to="/login"
            >
              <Typography variant={size}>

              Login/Register
              </Typography>
            </Button>
          )}
        </div>
      </AppBar>
    </header>
  );
};

export default withRouter(NavBar);
