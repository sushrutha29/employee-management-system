import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import EmployeeForm from "../employees/EmployeeForm";
import { addEmployee, updateEmployee, getAllEmployees, deleteEmployee } from "../../services/EmployeeService";
import toast from "react-hot-toast";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState("");
    

    useEffect(() => {
        loadEmployees();
    }, []);
    const loadEmployees = async () => {
        setIsLoading(true);
        setLoadError("");
        try {
            const data = await getAllEmployees();
            setEmployees(data || []);
        } catch (err) {
            setEmployees([]);
            setLoadError(err.message || "Failed to load employees");
            toast.error(err.message || "Failed to load employees");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (emp) => {
        try {
            if (editEmployee) {
                await updateEmployee(editEmployee.id, emp);
                toast.success("Employee updated successfully");
            } else {
                await addEmployee(emp);
                toast.success("Employee added successfully");
            }
            setShowForm(false);
            setEditEmployee(null);
            loadEmployees();
        } catch (err) {
            toast.error(err.message || "Failed to save employee");
        }
    };

    const handleEdit = (emp) => {
        setEditEmployee(emp);
        setShowForm(true);
    };
    const handleDelete = async (id) => {
        const ok = window.confirm("are you sure to delete this employee?");
        if (!ok) return;
        await deleteEmployee(id);
        loadEmployees();
        toast.success("Employee deleted successfully");
    }; 

    const handleExport = async () => {
        const { exportTableToPdf } = await import("../../utils/pdfExport");
        exportTableToPdf({
            title: "Employees",
            columns: ["ID", "Name", "Email", "Department", "Role", "Status"],
            rows: employees.map((e) => [
                e.employeeId, e.name, e.email, e.department, e.role, e.status
            ]),
            fileName: "employees.pdf",
        });
    };

    return (
        <Layout>
            <h1 className="page-title">Employee List</h1>
            <p className="page-subtitle">Manage employee records and roles.</p>
            <div className="flex items-center gap-2 mb-4">
                <button
                    className="btn btn-success"
                    onClick={() => {
                        setShowForm(true);
                        setEditEmployee(null);
                    }}
                >
                    Add employee
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleExport}
                >
                    Export PDF
                </button>
            </div>
            <div className="table-wrapper">
                <table className="w-full border-collapse">
                    <thead className="table-header">
                        <tr>
                            <th className="table-cell">ID</th>
                            <th className="table-cell">Name</th>
                            <th className="table-cell">Email</th>
                            <th className="table-cell">Department</th>
                            <th className="table-cell">Role</th>
                            <th className="table-cell">Status</th>
                            <th className="table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td className="table-cell text-center text-gray-500" colSpan={7}>
                                    Loading employees...
                                </td>
                            </tr>
                        )}
                        {!isLoading && loadError && (
                            <tr>
                                <td className="table-cell text-center text-red-600" colSpan={7}>
                                    {loadError}
                                </td>
                            </tr>
                        )}
                        {!isLoading && !loadError && employees.length === 0 && (
                            <tr>
                                <td className="table-cell text-center text-gray-500" colSpan={7}>
                                    No employees found.
                                </td>
                            </tr>
                        )}
                        {employees.map((employee) => (
                            <tr key={employee.id} className="table-row">
                                <td className="table-cell">{employee.employeeId}</td>
                                <td className="table-cell">{employee.name}</td>
                                <td className="table-cell">{employee.email}</td>
                                <td className="table-cell">{employee.department}</td>
                                <td className="table-cell">{employee.role}</td>
                                <td className="table-cell">{employee.status}</td>
                                <td className="table-cell">
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(employee)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <EmployeeForm 
                onSave={handleSave}
                employee={editEmployee}
                onCancel={() => { setShowForm(false); setEditEmployee(null); }} 
                />
            )}
        </Layout>
    );
}

export default Employees;