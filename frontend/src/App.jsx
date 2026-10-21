import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import CareerGoals from "./pages/CareerGoals";
import SkillGap from "./pages/SkillGap";
import CareerPlan from "./pages/CareerPlan";
import Progress from "./pages/Progress";
import Opportunities from "./pages/Opportunities";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/career-goals" element={<CareerGoals />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/career-plan" element={<CareerPlan />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;