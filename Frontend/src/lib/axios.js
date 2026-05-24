import axios from "axios";

// Use environment variable for backend URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === "development" ? "http://localhost:8001" : "https://imagino-iba4.onrender.com");

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refreshing on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error status is 401 (Unauthorized) and the request was not a retry or a refresh request itself
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url?.includes('/refresh')
    ) {
      originalRequest._retry = true;
      try {
        // Execute refresh post call withCredentials to send the refreshToken cookie
        const res = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        if (res.data && res.data.token) {
          const newToken = res.data.token;
          localStorage.setItem('token', newToken);
          
          // Update the original request's Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token validation failed, clearing session.", refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;