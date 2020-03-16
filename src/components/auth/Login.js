import React, { useState } from "react";
import UserManager from "../../modules/UserManager.js";

const Login = props => {
  const [credentials, setCredentials] = useState({
    userName: "",
    email: ""
  });

  const [register, setRegister] = useState({
    userName: "",
    email: "",
    confirmEmail: ""
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegFieldChange = evt => {
    const stateToChange = { ...register };
    stateToChange[evt.target.id] = evt.target.value;
    setRegister(stateToChange);
  };

  const handleReg = e => {
    e.preventDefault();
    let valid = true;
    UserManager.getAll().then(users => {
      users.map(user => {
        if (user.userName === register.userName) {
          valid = false;
          alert("Username already in database");
        }
      });
      if (register.email !== register.confirmEmail) {
        valid = false;
        alert("Email does not match");
      }
      if (
        register.userName === "" ||
        register.email === ""
      ) {
        valid = false;
        alert("Please Fill in all fields");
      }
      if (valid) {
        props.history.push("/");
        const newUser = {
          userName: register.userName,
          email: register.email
        };
        UserManager.post(newUser)
          .then(UserManager.getAll)
          .then(users => {
            const newCred = {
              userName: register.userName,
              email: register.email
            };
            props.setUser(newCred, users.length);
          });
      }
    });
  };

  const handleLogin = e => {
    e.preventDefault();
    let valid = false;
    UserManager.getAll().then(users => {
      users.map(user => {
        if (
          user.userName === credentials.userName &&
          user.email === credentials.email
        ) {
          valid = true;
          props.setUser(credentials, user.id);
          props.history.push("/");
        }
      });
      if (!valid) {
        alert("incorrect username/password");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <h3>Please sign in</h3>
          <div className="formgrid">
            <label htmlFor="inputUserName">Username: </label>
            <input
              onChange={handleFieldChange}
              type="userName"
              id="userName"
              placeholder="Username"
              required=""
              autoFocus=""
            />

            <label htmlFor="inputEmail">Email: </label>
            <input
              onChange={handleFieldChange}
              type="email"
              id="email"
              placeholder="Email"
              required=""
            />
          </div>
          <button type="submit">Sign in</button>
        </fieldset>
      </form>

      <form onSubmit={handleReg}>
        <fieldset>
          <h3>Make a new account</h3>
          <div className="formgrid">
            <label htmlFor="inputUserName">Username: </label>
            <input
              onChange={handleRegFieldChange}
              type="userName"
              id="userName"
              placeholder="Username"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputEmail">Email: </label>
            <input
              onChange={handleRegFieldChange}
              type="email"
              id="email"
              placeholder="Email"
              required=""
            />

            

            <label htmlFor="inputConfirmEmail">Confirm Email: </label>
            <input
              onChange={handleRegFieldChange}
              type="email"
              id="confirmEmail"
              placeholder="Confirm Email"
              required=""
            />
          </div>
          <button type="submit">Register</button>
        </fieldset>
      </form>
    </>
  );
};

export default Login;