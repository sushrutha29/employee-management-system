function Navbar() {
    return (
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">
            <h1 className="font-bold text-xl">Admin Panel</h1>
            <button className="btn btn-danger">Logout</button>
        </div>
    );
}

export default Navbar;