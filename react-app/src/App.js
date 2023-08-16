import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Feed";
import UserProfile from "./components/ManageUser/UserProfile";
import ViewUserProfile from "./components/ManageUser/SingleUser";
import SplashPage from "./components/SplashPage";
// import UserActivity from "./components/ManageUser/UserActivity";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className={location.pathname === "/" ? "nav-wrapper splash-page" : "nav-wrapper"}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
           <Route exact path="/">
              <SplashPage />
            </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/home">
          <ProtectedRoute>
            <HomePage/>
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
          <ProtectedRoute>
            <UserProfile/>
            {/* <UserActivity/> */}
            </ProtectedRoute>
          </Route>
          <Route path="/user/:userId">
          <ProtectedRoute>
            <ViewUserProfile/>
            </ProtectedRoute>
          </Route>
          {/* <Route path="/users/:userId">
          <ProtectedRoute>
            <SingleUser/>
            </ProtectedRoute>
          </Route> */}
         
        </Switch>
      )}
   </div>
  );
}

export default App;
