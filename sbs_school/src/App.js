import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Students from "./components/Students";
import Courses from "./components/Courses";
import AddCourses from "./components/AddCourses";
import AddStudent from "./components/AddStudent";
import CollectFee from "./components/CollectFee";
import PaymentHistory from "./components/PaymentHistory";
import CourseDetail from "./components/CourseDetail";
import StudentDetail from "./components/StudentDetail";

const myRouter = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { path: "", Component: Home },
      { path: "home", Component: Home },
      { path: "courses", Component: Courses },
      { path: "add-course", Component: AddCourses },
      { path: "students", Component: Students },
      { path: "add-students", Component: AddStudent },
      { path: "collect-fee", Component: CollectFee },
      { path: "payment-history", Component: PaymentHistory },
      { path: "course-detail/:id", Component: CourseDetail },
      { path: "update-course/:id", Component: AddCourses },
      { path: "update-student/:id", Component: AddStudent },
      { path: "student-detail/:id", Component: StudentDetail },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={myRouter} />
      <ToastContainer />
    </div>
  );
};

export default App;
