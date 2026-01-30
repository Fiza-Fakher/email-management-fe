import "./index.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/login/index";
import Detail from "./pages/detail/index";
import Web from "./pages/website";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const currentToken = localStorage.getItem("token");

    
    if (currentToken && location.pathname === "/login") {
      navigate("/", { replace: true });
    }

    
    if (!currentToken && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);  

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login />}
      />

      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/detail/:id"
        element={token ? <Detail /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/web"
        element={token ? <Web /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;