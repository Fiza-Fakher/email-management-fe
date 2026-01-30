import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/login/index";
import Detail from "./pages/detail/index";
import Web from "./pages/website";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />

      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />

      
      <Route path="/detail/:id" element={token ? <Detail /> : <Navigate to="/login" replace />} />
      <Route path="/web" element={token ? <Web /> : <Navigate to="/login" replace />} />

      
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default App;