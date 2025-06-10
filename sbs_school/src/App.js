import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const myRouter = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={myRouter} />
    </div>
  );
};

export default App;
