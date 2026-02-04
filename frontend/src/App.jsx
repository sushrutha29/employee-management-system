import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Salary from "./pages/admin/Salary";
import Profile from "./pages/employees/Profile";
import RequireRole from "./routes/RequireRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <RequireRole role="ADMIN">
              <Dashboard />
            </RequireRole>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <RequireRole role="ADMIN">
              <Employees />
            </RequireRole>
          }
        />

        <Route
          path="/admin/salary"
          element={
            <RequireRole role="ADMIN">
              <Salary />
            </RequireRole>
          }
        />

        <Route
          path="/employee/profile"
          element={
            <RequireRole role="USER">
              <Profile />
            </RequireRole>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
