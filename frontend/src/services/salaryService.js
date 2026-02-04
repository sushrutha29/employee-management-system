const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed with status ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
};

// Reusable headers with JWT
import { getToken } from "../utils/authStorage";

const getHeaders = () => {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

export const getSalaryByEmployee = async (employeeId) => {
    const response = await fetch(`${API_BASE}/salary/${employeeId}`, {
        headers: getHeaders(),
    });
    return handleResponse(response);
};

export const addSalary = async (employeeId, salary) => {
    const response = await fetch(`${API_BASE}/salary/${employeeId}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(salary),
    });
    return handleResponse(response);
};
