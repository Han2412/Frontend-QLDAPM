import React, { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Ath/Login";
import NotFound from "../pages/NotFound/Notfound";
import AdminLayout from "../components/Layouts/LayoutAdmin";
import Statistical from "../pages/Statistical";

const Home = lazy(() => import("../pages/Dashboard/Home"));
const routesConfig = [
  {
    path: "/login",
    element: React.createElement(Login),
  },
  {
    path: "/",
    element: React.createElement(Home),
  },
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      { path: "/home", index: true, element: <Home /> },
      { path: "/statistics", index: true, element: <Statistical /> },

      { index: true, element: <h1>Dashboard Home</h1> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routesConfig;
