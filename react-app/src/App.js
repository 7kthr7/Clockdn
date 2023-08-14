import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/Feed";
import UserProfile from "./components/ManageUser/UserProfile";
import ViewUserProfile from "./components/ManageUser/SingleUser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/feed">
          <ProtectedRoute>
            <HomePage/>
            </ProtectedRoute>
          </Route>
          <Route path="/user/:userId">
          <ProtectedRoute>
            <ViewUserProfile/>
            </ProtectedRoute>
          </Route>
          <Route path="/profile">
          <ProtectedRoute>
            <UserProfile/>
            </ProtectedRoute>
          </Route>
          {/* <Route path="/users/:userId">
          <ProtectedRoute>
            <SingleUser/>
            </ProtectedRoute>
          </Route> */}
         
        </Switch>
      )}
    </>
  );
}

export default App;
