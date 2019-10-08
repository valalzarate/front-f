import React, { useState } from "react";

import { Route } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Router(props) {
  const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: SignIn
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/forgotPassword",
      component: ForgotPassword
    },
    {
      path: "/how",
      component: ProductHowItWorks
    }
  ];

  return routes.map(route => (
    <Route
      exact
      path={route.path}
      render={routeProps => <route.component {...routeProps} {...props} />}
      key={route.path}
    />
  ));
}
