import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './privateRoute';
import BaseLayout from '../layouts/baseLayout';
import LoginLayout from '../layouts/loginLayout';
import ErrorPage from '../pages/error';


export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/error" component={ErrorPage} />
        <PrivateRoute path="/" component={BaseLayout} />
      </Switch>
    </Router>
  );
}
