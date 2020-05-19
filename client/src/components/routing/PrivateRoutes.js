import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import ChangePassword from "../auth/ChangePassword";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";

const PrivateRoutes = () => {
  return (
    <section className="container">
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute
          exact
          path="/change-password"
          component={ChangePassword}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default PrivateRoutes;
