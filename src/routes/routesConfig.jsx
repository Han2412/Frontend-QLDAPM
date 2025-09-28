import React, { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Ath/Login";
import NotFound from "../pages/NotFound/Notfound";
import AdminLayout from "../components/Layouts/LayoutAdmin";
import Statistical from "../pages/Statistical";
import Employee from "../pages/Employee";
import Orderpage from "../pages/OrderPage";

const Home = lazy(() => import("../pages/Dashboard/Home"));
const Productlist = lazy(() => import("../pages/product"));

const routesConfig = [
  {
    path: "/login",
    element: React.createElement(Login),
  },

  {
    path: "/order_page",
    element: <Orderpage />,
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

      { path: "/product", index: true, element: <Productlist /> },

      { path: "/employees", index: true, element: <Employee /> },


      { index: true, element: <h1>Dashboard Home</h1> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routesConfig;
