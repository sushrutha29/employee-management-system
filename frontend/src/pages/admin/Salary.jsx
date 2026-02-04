import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import { addSalary, getSalaryByEmployee } from "../../services/salaryService";

function Salary() {
    const [salaries, setSalaries] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [form, setForm] = useState({
        basic: "",
        allowance: "",
        deduction: "",
        month: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        loadSalaries();
    }, [employeeId]);

    const loadSalaries = async () => {
        if (!employeeId) return;
        setIsLoading(true);
        try {
            const data = await getSalaryByEmployee(employeeId);
            setSalaries(data || []);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddSalary = async () => {
        if (!employeeId) return;
        if (isSubmitting) return;
        const payload = {
            basic: Number(form.basic),
            allowance: Number(form.allowance),
            deduction: Number(form.deduction),
            month: form.month || undefined,
        };
        setIsSubmitting(true);
        try {
            await addSalary(employeeId, payload);
            setForm({ basic: "", allowance: "", deduction: "", month: "" });
            loadSalaries();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExport = async () => {
        const { exportTableToPdf } = await import("../../utils/pdfExport");
        exportTableToPdf({
            title: "Salary Report",
            columns: ["Employee ID", "Name", "Month", "Basic", "Allowance", "Deduction", "Net"],
            rows: salaries.map((s) => [
                employeeId,
                s.employee?.name ?? "-",
                s.month,
                s.basic,
                s.allowance,
                s.deduction,
                s.netSalary
            ]),
            fileName: "salary.pdf",
        });
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="page-title">Salary Management</h1>
                    <p className="page-subtitle">Track and manage payroll per employee.</p>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        className="input w-48"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={loadSalaries}
                    >
                        Load
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={handleExport}
                    >
                        Export PDF
                    </button>
                </div>
            </div>
            <div className="card mb-6">
                <div className="card-header">
                    <h2 className="section-title mb-0">Add Salary</h2>
                </div>
                <div className="grid grid-cols-4 gap-3">
                <input
                    name="basic"
                    value={form.basic}
                    onChange={handleChange}
                    className="input"
                    placeholder="Basic"
                    type="number"
                />
                <input
                    name="allowance"
                    value={form.allowance}
                    onChange={handleChange}
                    className="input"
                    placeholder="Allowance"
                    type="number"
                />
                <input
                    name="deduction"
                    value={form.deduction}
                    onChange={handleChange}
                    className="input"
                    placeholder="Deduction"
                    type="number"
                />
                <input
                    name="month"
                    value={form.month}
                    onChange={handleChange}
                    className="input"
                    placeholder="Month (e.g. March 2026)"
                />
                <div className="col-span-4 flex justify-end mt-2">
                    <button
                        className="btn btn-success disabled:opacity-60"
                        onClick={handleAddSalary}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding..." : "Add salary"}
                    </button>
                </div>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="w-full border-collapse">
                    <thead className="table-header">
                        <tr>
                            <th className="table-cell">Employee id</th>
                            <th className="table-cell">Name</th>
                            <th className="table-cell">Month</th>
                            <th className="table-cell">Basic</th>
                            <th className="table-cell">Allowances</th>
                            <th className="table-cell">Deductions</th>
                            <th className="table-cell">Net salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td className="table-cell text-center text-gray-500" colSpan={7}>
                                    Loading salaries...
                                </td>
                            </tr>
                        )}
                        {!isLoading && salaries.length === 0 && (
                            <tr>
                                <td className="table-cell text-center text-gray-500" colSpan={7}>
                                    No salary records for this employee.
                                </td>
                            </tr>
                        )}
                        {salaries.map((s) => (
                            <tr key={s.id} className="table-row">
                                <td className="table-cell">{employeeId}</td>
                                <td className="table-cell">{s.employee?.name ?? "-"}</td>
                                <td className="table-cell">{s.month}</td>
                                <td className="table-cell">{s.basic}</td>
                                <td className="table-cell">{s.allowance}</td>
                                <td className="table-cell">{s.deduction}</td>
                                <td className="table-cell">{s.netSalary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Salary;