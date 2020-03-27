import React, {useState} from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews"
import { CssBaseline } from "@material-ui/core";


const Main = () => {
    const isAuthenticated =() => sessionStorage.getItem("credentials") !== null;

    const [hasUser, setHasUser] = useState(isAuthenticated());

    const userId = sessionStorage.getItem("id")
   
    const setUser = (user, id) => {
        sessionStorage.setItem("credentials", JSON.stringify(user));
        sessionStorage.setItem("id", id)
        setHasUser(isAuthenticated());
    }

    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
    }

    return (
        <>
        <CssBaseline/>
        <NavBar hasUser={hasUser} clearUser={clearUser}  />
        <ApplicationViews hasUser={hasUser} setUser={setUser} userId={userId} />
        </>
    )
}

export default Main