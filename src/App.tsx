import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Apps from "./pages/Apps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "resume", element: <Resume /> },
      { path: "projects", element: <Projects /> },
      { path: "apps", element: <Apps /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}