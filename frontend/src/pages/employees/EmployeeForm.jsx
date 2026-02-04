import { useEffect, useState } from "react";

function EmployeeForm({ onSave, employee, onCancel}) {
    const [form, setForm] = useState({
        name: "",
        employeeId: "",
        email: "",
        department: "",
        role: "",
        status: "Active",
    });

    useEffect(() => {
        if (employee) setForm(employee);
    }, [employee]);

    const handleChange= (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center ">
            <div className="card w-96">
                <h2 className="section-title">
                    {employee ? "Edit Employee" : "Add Employee"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input" required />
                    <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} className="input" required />
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" required />
                    <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="input" required />
                    <input name="role" placeholder="Role" value={form.role} onChange={handleChange} className="input" required />
                    <select name="status" value={form.status} onChange={handleChange} className="input">
                        <option>Active</option>
                        <option>On leave</option>
                        <option>Resigned</option>
                    </select>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onCancel} className="btn">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;