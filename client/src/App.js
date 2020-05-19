import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/auth";
import ScrollToTop from "./utils/ScrollToTop";
import setAuthToken from "./utils/setAuthToken";

import NavbarMenu from "./components/layout/NavbarMenu";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import PublicRoutes from "./components/routing/PublicRoutes";
import Alert from "./components/layout/Alert.js";
import ToastSlim from "./components/toast/ToastSlim";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const titleWebSite = process.env.REACT_APP_TITLE_WEBSITE;

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Helmet>
            <title>{titleWebSite}</title>
          </Helmet>
          <ToastSlim />
          <NavbarMenu />
          <Alert />
          <main className="flex-shrink-0">
            <ScrollToTop>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={PublicRoutes} />
              </Switch>
            </ScrollToTop>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
