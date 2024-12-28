import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ErrorPage from "@/pages/ErrorPage";
import DashBoard from "@/pages/Dashboard";
import ProtectedRoute from "@/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/signup", element: <Signup /> },
  { path: "/", element: <ProtectedRoute element={<DashBoard />} /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*", // Catch-all route for 404
    element: <ErrorPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
