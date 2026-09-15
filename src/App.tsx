import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Apps from "./pages/Apps";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resume" element={<Resume />} />
          <Route path="projects" element={<Projects />} />
          <Route path="apps" element={<Apps />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}