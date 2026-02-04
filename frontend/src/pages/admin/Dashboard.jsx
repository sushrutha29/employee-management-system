import Layout from "../../components/common/Layout";

function Dashboard() {
    return (
        <Layout>
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Overview of your workforce and payroll.</p>
            <div className="grid grid-cols-3 gap-4"> 
                <div className="card">
                    <div className="text-sm text-gray-500">Total Employees</div>
                    <div className="text-2xl font-semibold mt-2">-</div>
                </div>
                <div className="card">
                    <div className="text-sm text-gray-500">Active Employees</div>
                    <div className="text-2xl font-semibold mt-2">-</div>
                </div>
                <div className="card">
                    <div className="text-sm text-gray-500">Monthly Payroll</div>
                    <div className="text-2xl font-semibold mt-2">-</div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;