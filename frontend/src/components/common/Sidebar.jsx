import { NavLink } from "react-router-dom";
function Sidebar() {
    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">EMS ADMIN</h2>
            <nav className="flex flex-col gap-4">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/admin/employees"
                    className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                >
                    Employees
                </NavLink>
                <NavLink
                    to="/admin/salary"
                    className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                >
                    Salary
                </NavLink>
                <NavLink
                    to="/employee/profile"
                    className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}
                >
                    Profile
                </NavLink>

            </nav>
        </div>
    );
}

export default Sidebar;