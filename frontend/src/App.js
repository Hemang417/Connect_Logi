import React, { Suspense } from "react";
import { HashRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./scss/style.scss";
import { AppProvider } from "../src/views/organization/Innerpage/AppContext";

const loading = React.createElement("div", { className: "pt-3 text-center" }, 
  React.createElement("div", { className: "sk-spinner sk-spinner-pulse" })
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const ForgetPassword = React.lazy(() => import("./views/pages/login/ForgetPassword"));
const Register = React.lazy(() => import("./views/pages/register/NewRegister"));
const Page404 = React.lazy(() => import("./views/errorPages/FourZeroFour"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

// 🔥 Fix: Move useLocation inside a new component wrapped in <HashRouter>
const AppRoutes = function () {
  const location = useLocation(); // ✅ Now inside <HashRouter>

  return React.createElement(
    AppProvider,
   null, // ✅ Pass location to AppProvider
    React.createElement(
      Suspense,
      { fallback: loading },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, { element: React.createElement(Navigate, { to: "/login" }), path: "/" }),
        React.createElement(Route, { element: React.createElement(Login), path: "/login" }),
        React.createElement(Route, { element: React.createElement(ForgetPassword), path: "/ForgetPassword" }),
        React.createElement(Route, { element: React.createElement(Register), path: "/register" }),
        React.createElement(Route, { element: React.createElement(Page404), path: "/404" }),
        React.createElement(Route, { element: React.createElement(Page500), path: "/500" }),
        React.createElement(Route, { element: React.createElement(DefaultLayout), path: "*" })
      )
    )
  );
};

const App = function () {
  return React.createElement(HashRouter, null, React.createElement(AppRoutes));
};

export default App;
