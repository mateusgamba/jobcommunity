import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

import Register from "../auth/Register";
import Login from "../auth/Login";
import Forget from "../auth/Forget";
import ResetPassword from "../auth/ResetPassword";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import About from "../content/About";
import Contact from "../content/Contact";
import PrivacyPolicy from "../content/PrivacyPolicy";
import TermsConditions from "../content/TermsConditions";

const PublicRoutes = () => {
  return (
    <div className="mb-9">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forget" component={Forget} />
        <Route exact path="/reset-password/:hash" component={ResetPassword} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/terms-conditions" component={TermsConditions} />
        <Route component={PrivateRoutes} />
      </Switch>
    </div>
  );
};

export default PublicRoutes;
