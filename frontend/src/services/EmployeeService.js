const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}`);
    }
    if (response.status === 204) {
        return null;
    }
    return response.json();
};

// Reusable headers with token
import { getToken } from "../utils/authStorage";

const getHeaders = () => {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

export const getAllEmployees = async () => {
    const response = await fetch(`${API_BASE}/employees`, {
        headers: getHeaders(),
    });
    return handleResponse(response);
};

export const addEmployee = async (employee) => {
    const response = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(employee),
    });
    return handleResponse(response);
};

export const updateEmployee = async (id, employee) => {
    const response = await fetch(`${API_BASE}/employees/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(employee),
    });
    return handleResponse(response);
};

export const deleteEmployee = async (id) => {
    const response = await fetch(`${API_BASE}/employees/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    return handleResponse(response);
};
