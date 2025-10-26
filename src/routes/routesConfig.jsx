import React, { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Ath/Login";
import NotFound from "../pages/NotFound/Notfound";
import AdminLayout from "../components/Layouts/LayoutAdmin";
import Statistical from "../pages/Statistical";
import Employee from "../pages/Employee";
import Orderpage from "../pages/OrderPage";
import Bills from "../pages/Bills";
import Sale from "../pages/Sales";
import ProtectedRoute from "./ProtectedRoute";
import PatenderPage from "../pages/PatenderPage";

const Home = lazy(() => import("../pages/Dashboard/Home"));
const Productlist = lazy(() => import("../pages/product"));

const routesConfig = [
  {
    path: "/login",
    element: <Login />,
  },

  // Nhân viên phục vụ (roleID = 2)
  {
    path: "/order_page",
    element: (
      <ProtectedRoute allowedRoles={[2]}>
        <Orderpage />
      </ProtectedRoute>
    ),
  },

  // Bartender (roleID = 3)
  {
    path: "/bartender_page",
    element: (
      <ProtectedRoute allowedRoles={[3]}>
        <PatenderPage />
      </ProtectedRoute>
    ),
  },

  // Admin (roleID = 1)
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={[1]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/statistics", index: true, element: <Statistical /> },
      { path: "/product", index: true, element: <Productlist /> },
      { path: "/employees", index: true, element: <Employee /> },
      { path: "/bills", index: true, element: <Bills /> },
      { path: "/sales", index: true, element: <Sale /> },
    ],
  },

  { path: "*", element: <NotFound /> },
];

export default routesConfig;
