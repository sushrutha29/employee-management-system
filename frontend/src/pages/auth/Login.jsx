import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../utils/authStorage";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Login failed");
            }
            const data = await response.json();
            setAuth({ token: data.token, role: data.role });
            const role = (data.role || "").toUpperCase();
            if (role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/employee/profile");
            }
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="card w-96">
                <h2 className="section-title text-center">Login</h2>
                <p className="page-subtitle text-center mb-6">Sign in to access the dashboard.</p>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input mb-4"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input mb-4"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
                <button
                    type="submit"
                    className="btn btn-primary w-full disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;