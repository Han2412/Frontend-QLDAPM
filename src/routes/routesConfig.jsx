import React,{ lazy }  from "react";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Ath/Login";
import NotFound from "../pages/NotFound/Notfound";
import AdminLayout from "../components/Layouts/LayoutAdmin"

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
    element:<AdminLayout/>,
  
    children: [
      { index: true, element: <Home /> },
      { index: true, element: <h1>Dashboard Home</h1> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routesConfig;
