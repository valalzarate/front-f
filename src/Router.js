import React from "react";

import { Route } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Eventos from "./modules/views/Eventos";
import Contact from "./Contact";
import Perfil from "./Perfil";
import crearEvento from "./crearEvento";

export default function Router(props) {
  const routes = [
    { path: "/", component: Home },
    { path: "/login", component: SignIn },
    { path: "/signup", component: SignUp },
    { path: "/forgotPassword", component: ForgotPassword },
    { path: "/info", component: ProductHowItWorks },
    { path: "/terms", component: Terms },
    { path: "/privacy", component: Privacy },
    { path: "/eventos", component: Eventos },
    { path: "/contact", component: Contact },
    { path: "/perfil", component: Perfil },
    { path: "/crearEvento", component: crearEvento },
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
