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
  StartOrEnd,
} from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import AllProductions from "./pages/AllProductions";
import MeasureLayout from "./pages/MeasureLayout";

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
              path: "select",
              element: <MeasureLayout />,
              children:[
                {
                  index:true,
                  element: <StartOrEnd />
                },
                {
                  path:":slug",
                  element:  <MeasureLayout />,
                  children:[
                    {
                      index:true,
                      element:<MeasureList />
                    },
                    {
                      path: ":slug",
                      element: <Measure />,
                    },
                  ]
                }
              ]
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
