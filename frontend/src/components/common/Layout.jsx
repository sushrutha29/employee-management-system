import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-64">
                <Navbar />
                <div className="p-6 max-w-6xl">{children}</div>
            </div>
        </div>
    );
}

export default Layout;