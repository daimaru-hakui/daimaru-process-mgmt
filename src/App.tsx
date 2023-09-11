import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddTask,
  Admin,
  AllTasks,
  Dashboard,
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Measure,
  MeasureList,
  Task,
  AllTaskLayout,
  TaskHistories,
} from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import MeasureLaayout from "./pages/MeasureLaayout";
import AllProductions from "./pages/AllProductions";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "admin",
              element: <Admin />,
            },
            {
              path: "all-tasks",
              element: <AllTaskLayout />,
              children: [
                {
                  index: true,
                  element: <AllTasks />,
                },
                {
                  path: ":id",
                  element: <Task />,
                },
              ],
            },
            {
              path: "add-task",
              element: <AddTask />,
            },
            {
              path: "task-histories",
              element: <TaskHistories />,
            },
            {
              path: "all-productions",
              element: <AllProductions />,
            },
            {
              path: "measure-list",
              element: <MeasureLaayout />,
              children: [
                {
                  index: true,
                  element: <MeasureList />,
                },
                {
                  path: ":slug",
                  element: <Measure />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
