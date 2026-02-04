export const setAuth = ({ token, role }) => {
    try {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    } catch (err) {
        // ignore storage errors
    }
    try {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
    } catch (err) {
        // ignore storage errors
    }
};

export const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getRole = () => {
    return localStorage.getItem("role") || sessionStorage.getItem("role");
};
